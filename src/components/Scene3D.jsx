import { useEffect, useRef } from "react";

// A calm 3D scene drawn on a canvas: three mounted cameras slowly pan across a
// floor, each projecting its field of view onto the ground. An object is
// "detected" (box and label at full strength) while it sits inside a view.
// The view itself is fixed; visitors can drag to turn it.
// World units: the floor spans -3..3 on x and z, y is up.

const OBJECTS = [
  { cls: "vision", at: [-1.5, -1.1], size: [1.1, 1.3, 1.1] },
  { cls: "web_app", at: [1.4, -1.3], size: [1.3, 0.9, 0.9] },
  { cls: "real_time", at: [-1.2, 1.4], size: [0.9, 0.7, 1.2] },
  { cls: "distributed", at: [1.3, 1.2], size: [1.0, 1.6, 1.0] },
];

// Each camera looks at a point on the floor that slides back and forth
// between two ends, so its field of view sweeps across part of the scene
const CAMERAS = [
  { pos: [-2.3, 1.9, -2.3], from: [-1.6, 0, 1.6], to: [1.5, 0, -1.4], period: 11, phase: 0 },
  { pos: [2.3, 1.9, -2.3], from: [-1.5, 0, -1.2], to: [1.4, 0, 1.4], period: 13, phase: 2.1 },
  { pos: [0, 1.9, 2.4], from: [-1.6, 0, -0.6], to: [1.6, 0, -0.4], period: 9, phase: 4.2 },
];
const FOV_H = 0.2; // half-angles of each camera's view, radians
const FOV_V = 0.15;

const YAW = 0.7; // starting view angle; dragging turns it
const ELEVATION = 0.55;
const DISTANCE = 11;

function boxCorners({ at, size }) {
  const [w, h, d] = size;
  const xs = [at[0] - w / 2, at[0] + w / 2];
  const zs = [at[1] - d / 2, at[1] + d / 2];
  const corners = [];
  for (const y of [0, h]) for (const x of xs) for (const z of zs) corners.push([x, y, z]);
  return corners; // 0-3 bottom, 4-7 top
}

const EDGES = [
  [0, 1], [1, 3], [3, 2], [2, 0],
  [4, 5], [5, 7], [7, 6], [6, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => scale(a, 1 / Math.hypot(...a));

// Where a camera ray meets the floor (y = 0)
function toFloor(origin, dir) {
  const t = -origin[1] / Math.min(dir[1], -0.05);
  return add(origin, scale(dir, t));
}

// The four floor corners a camera currently sees
function footprint(cam, time) {
  const s = 0.5 - 0.5 * Math.cos(((time / cam.period) * 2 + cam.phase / Math.PI) * Math.PI);
  const target = add(cam.from, scale(sub(cam.to, cam.from), s));
  const forward = norm(sub(target, cam.pos));
  const right = norm(cross(forward, [0, 1, 0]));
  const up = cross(right, forward);
  const th = Math.tan(FOV_H), tv = Math.tan(FOV_V);
  return [
    [-th, tv], [th, tv], [th, -tv], [-th, -tv],
  ].map(([h, v]) => toFloor(cam.pos, norm(add(forward, add(scale(right, h), scale(up, v))))));
}

// Is floor point (x, z) inside the quad (convex, in order)?
function inside([x, z], quad) {
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const a = quad[i], b = quad[(i + 1) % 4];
    const c = (b[0] - a[0]) * (z - a[2]) - (b[2] - a[2]) * (x - a[0]);
    if (c !== 0) {
      if (sign && Math.sign(c) !== sign) return false;
      sign = Math.sign(c);
    }
  }
  return true;
}

function readColors(el) {
  const css = getComputedStyle(el);
  const get = (name) => css.getPropertyValue(name).trim();
  return {
    line: get("--line"),
    muted: get("--muted"),
    surface: get("--surface-2"),
    lens: get("--class-vision"),
    classes: Object.fromEntries(OBJECTS.map(({ cls }) => [cls, get(`--class-${cls}`)])),
  };
}

export default function Scene3D() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const labelRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const boxes = OBJECTS.map(boxCorners);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let colors = readColors(wrap);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let yaw = YAW;
    let time = 2; // reduced motion freezes on this moment, with every camera mid-sweep
    let dragging = null;
    let visible = true;
    let frame = 0;
    let last = performance.now();

    function resize() {
      width = wrap.clientWidth;
      height = wrap.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    function project([x, y, z]) {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x1 = x * cy - z * sy;
      const z1 = x * sy + z * cy;
      const ce = Math.cos(ELEVATION), se = Math.sin(ELEVATION);
      const y2 = (y - 0.6) * ce - z1 * se;
      const z2 = (y - 0.6) * se + z1 * ce;
      const depth = DISTANCE + z2;
      // framed so all three cameras fit; the floor grid may run off the edges
      // fit to the shorter side, so a wide frame (desktop) or a square one (mobile) both show it all
      const f = Math.min(width, height) * 1.6;
      return [width * 0.485 + (x1 * f) / depth, height * 0.65 - (y2 * f) / depth];
    }

    function path(points, close) {
      ctx.beginPath();
      points.forEach((p, i) => {
        const [x, y] = project(p);
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      });
      if (close) ctx.closePath();
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.lineJoin = "round";

      // floor grid
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        path([[i, 0, -3], [i, 0, 3]]);
        ctx.stroke();
        path([[-3, 0, i], [3, 0, i]]);
        ctx.stroke();
      }

      // each camera's view: a lit footprint on the floor and the four rays to it
      const views = CAMERAS.map((cam) => footprint(cam, time));
      ctx.fillStyle = colors.lens;
      ctx.strokeStyle = colors.lens;
      views.forEach((quad, n) => {
        const cam = CAMERAS[n];
        ctx.globalAlpha = 0.1;
        path(quad, true);
        ctx.fill();
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;
        path(quad, true);
        ctx.stroke();
        ctx.globalAlpha = 0.28;
        for (const corner of quad) {
          path([cam.pos, corner]);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      // cameras: a mast down to the floor and a small housing with its lens
      for (const cam of CAMERAS) {
        ctx.strokeStyle = colors.muted;
        ctx.lineWidth = 1;
        path([[cam.pos[0], 0, cam.pos[2]], cam.pos]);
        ctx.stroke();
        const [x, y] = project(cam.pos);
        ctx.fillStyle = colors.surface;
        ctx.strokeStyle = colors.lens;
        ctx.lineWidth = 2;
        ctx.fillRect(x - 7, y - 5, 14, 10);
        ctx.strokeRect(x - 7, y - 5, 14, 10);
        ctx.fillStyle = colors.lens;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // objects: full strength while any camera sees them, faint otherwise
      boxes.forEach((corners, n) => {
        const { cls, at } = OBJECTS[n];
        const seen = views.some((quad) => inside(at, quad));
        ctx.strokeStyle = colors.classes[cls];
        ctx.lineWidth = 2;
        ctx.globalAlpha = seen ? 1 : 0.3;
        ctx.beginPath();
        for (const [a, b] of EDGES) {
          const [ax, ay] = project(corners[a]);
          const [bx, by] = project(corners[b]);
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;

        const top = corners.slice(4).map(project).reduce((a, b) => (b[1] < a[1] ? b : a));
        const label = labelRefs.current[n];
        if (label) {
          label.style.transform = `translate(${top[0]}px, ${top[1]}px)`;
          label.style.opacity = seen ? "1" : "0.25";
        }
      });
    }

    function tick(now) {
      time += Math.min((now - last) / 1000, 0.05);
      last = now;
      draw();
      frame = visible && !document.hidden ? requestAnimationFrame(tick) : 0;
    }

    function start() {
      if (reduceMotion || frame || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function onDown(e) {
      dragging = { x: e.clientX, yaw };
      canvas.setPointerCapture(e.pointerId);
    }
    function onMove(e) {
      if (!dragging) return;
      yaw = dragging.yaw + (e.clientX - dragging.x) * 0.008;
      if (reduceMotion) draw();
    }
    function onUp() {
      dragging = null;
    }

    resize();
    draw();
    start();

    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(wrap);
    // pause while off screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    io.observe(wrap);
    // repaint with the other palette when the theme toggles
    const mo = new MutationObserver(() => { colors = readColors(wrap); draw(); });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div
      className="scene"
      ref={wrapRef}
      role="img"
      aria-label="3D scene: three cameras pan across a room and detect four objects, labelled vision, web_app, real_time and distributed"
    >
      <canvas ref={canvasRef} className="scene__canvas" />
      {OBJECTS.map(({ cls }, n) => (
        <span key={cls} ref={(el) => (labelRefs.current[n] = el)} className={`scene__label tag tag--${cls}`} aria-hidden="true">
          {cls}
        </span>
      ))}
    </div>
  );
}
