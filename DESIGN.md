---
name: Omar Haouache Portfolio
description: A developer portfolio labelled the way a computer-vision model labels a frame.
colors:
  midnight-ground: "#0b1630"
  midnight-surface: "#111f42"
  midnight-surface-raised: "#17284f"
  midnight-line: "#24365f"
  ice-ink: "#eef3ff"
  ice-text: "#c6d1e7"
  slate-muted: "#95a6c8"
  signal-blue: "#4d97ff"
  signal-blue-ink: "#06102a"
  tag-ink: "#0b1630"
  scrim: "rgb(4 9 22 / 0.72)"
  class-vision: "#4da3ff"
  class-web-app: "#a3a9ff"
  class-real-time: "#ffb547"
  class-distributed: "#3ddc97"
  light-ground: "#e6edf7"
  light-surface: "#f3f7fc"
  light-surface-raised: "#dbe4f1"
  light-line: "#c6d2e4"
  light-ink: "#0b1a33"
  light-text: "#24344f"
  light-muted: "#4b5d7a"
  light-signal-blue: "#1747c9"
  light-signal-blue-ink: "#ffffff"
  light-tag-ink: "#ffffff"
  light-scrim: "rgb(11 26 51 / 0.45)"
  light-class-vision: "#1f5fe0"
  light-class-web-app: "#5b34d6"
  light-class-real-time: "#9a5600"
  light-class-distributed: "#0b7349"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5.2vw, 4.1rem)"
    fontWeight: 850
    lineHeight: 1.04
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 104"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.1rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 110"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0"
  label-sm:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.6
rounded:
  box: "0px"
  chip: "8px"
  control: "10px"
  card: "16px"
spacing:
  gutter: "1rem"
  gutter-wide: "1.5rem"
  card-body: "1.25rem"
  grid-gap: "1.5rem"
  section: "clamp(4.5rem, 9vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.signal-blue-ink}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.15rem"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.ice-ink}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.15rem"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.midnight-surface-raised}"
  card:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.ice-text}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-body}"
  card-frame-chip:
    backgroundColor: "{colors.midnight-ground}"
    textColor: "{colors.ice-ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.box}"
    padding: "0.05rem 0.5rem"
  anno-tag:
    backgroundColor: "{colors.class-vision}"
    textColor: "{colors.tag-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.box}"
    padding: "0.1rem 0.5rem"
  class-tag:
    backgroundColor: "{colors.class-vision}"
    textColor: "{colors.tag-ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.box}"
    padding: "0.05rem 0.45rem"
  filter-chip:
    textColor: "{colors.ice-ink}"
    rounded: "{rounded.box}"
    padding: "0.45rem 0.85rem"
    height: "44px"
  skill-item:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.ice-ink}"
    rounded: "{rounded.chip}"
    padding: "0.35rem 0.75rem"
  input:
    backgroundColor: "{colors.midnight-ground}"
    textColor: "{colors.ice-ink}"
    rounded: "{rounded.control}"
    padding: "0.8rem 1rem"
---

# Design System: Omar Haouache Portfolio

## Overview

**Creative North Star: "The Annotated Frame"**

A familiar developer-portfolio layout (sticky nav, split hero, project grid, timeline, contact) carrying a computer-vision annotation layer: the page is labelled the way Omar's models label frames. Headlines, the portrait and project screenshots wear 2px square bounding boxes with a filled mono label chip on the top-left corner, coloured by one of four annotation classes. The classes are the site's taxonomy: the hero legend, the project tags, the skill groups and the project filter all use the same four colours, so a recruiter learns the code once.

The ground is a deep midnight navy with ice-white text; the light theme is an ice-blue paper with the same structure and darker class colours that keep contrast. Density is moderate and editorial: generous section padding, one strong accent (signal blue) for the primary action, and colour otherwise reserved for annotation classes. Everything shown is proof (real screenshots, a real portrait with real landmarks, or a drawn architecture diagram), never stock art or clip-art.

Motion is the box being drawn: each annotation reveals once from its top-left corner with a clip-path wipe, in frame order. After that the page is still, except for direct feedback (press scale, filter re-layout).

**Key Characteristics:**
- Midnight navy ground (dark default), ice-blue light theme on `body.light-theme`.
- Four annotation classes: vision, web_app, real_time, distributed.
- One stroke weight (2px), square boxes, filled mono label chips.
- Soft 16px cards and 10px controls; annotation boxes are never rounded.
- Archivo (variable width) for everything read; JetBrains Mono only for labels and data.
- Fixed frame addresses (#001…) on every project card.

## Colors

A cool, low-saturation navy field with one signal-blue action colour and four saturated class colours that do all the categorising.

### Primary
- **Signal Blue** (`signal-blue`; light: `light-signal-blue`): the primary button, focus rings, selection, the active-nav underline, hover colour on text links, contact icons, and the section-title box once drawn. Text on it uses `signal-blue-ink`.

### Secondary: annotation classes
Each class colour fills its label chips and strokes its boxes, legend squares, filter chips and skill-group hover. They are categorical, not decorative: a colour always means its class.
- **Vision Blue** (`class-vision`): computer vision work; also the hero face box, landmarks and certificate icon.
- **Web-App Lavender** (`class-web-app`): web applications and SaaS.
- **Real-Time Amber** (`class-real-time`): WebSockets, streaming, live systems.
- **Distributed Green** (`class-distributed`): services, queues, multi-service deployments.

Light-theme class colours (`light-class-*`) are darker so white chip text (`light-tag-ink`) stays readable.

### Neutral
- **Midnight Ground** (`midnight-ground`): page background, header, input wells, the frame-address chip.
- **Midnight Surface** (`midnight-surface`): cards, secondary buttons, form panel, dialog.
- **Raised Surface** (`midnight-surface-raised`): card media panel, flow diagram ground, button hover, untyped tags.
- **Midnight Line** (`midnight-line`): 1px borders, row dividers, the undrawn section-title box.
- **Ice Ink** (`ice-ink`): headings, button text, emphasised values.
- **Ice Text** (`ice-text`): body copy.
- **Slate Muted** (`slate-muted`): ledes, card summaries, dates, counts, captions.
- **Scrim** (`scrim`): dialog backdrop.

### Named Rules
**The Class Colour Rule.** The four class colours mean their class and nothing else. Never use one as a generic accent; a new category gets a new entry in `src/data/classes.js` and a matching `--class-<id>` token in both themes.

**The One Action Rule.** Signal blue fills exactly one kind of thing: the primary action. Every other button is a surface button.

## Typography

**Display Font:** Archivo variable (wdth 100–125, wght 400–900), with system-ui fallback
**Body Font:** Archivo
**Label/Mono Font:** JetBrains Mono (400, 600), with ui-monospace fallback

**Character:** A sturdy grotesque pushed wide and heavy for headlines (width 104–110%, weight 800–850, tight negative tracking) against a plain mono for machine-like labels, the way a model's output sits on a photo.

### Hierarchy
- **Display** (850, clamp 2.3–4.1rem, 1.04): the hero headline only, each line wrapped in its annotation box.
- **Headline** (800, clamp 2–3.1rem, width 110%): section titles, each carrying a box that draws when first seen.
- **Title** (750, 1.3rem): card titles and timeline roles; skill-group titles at 1.15rem; dialog title at 1.7rem / 800.
- **Lede** (400, 1.2rem hero, 1.125rem section; max 36rem / 60ch): one paragraph under a heading.
- **Body** (400, 1.0625rem, 1.6): running text; timeline text capped at 65ch; card summaries clamp to three lines.
- **Label** (JetBrains Mono 600, 0.7–0.9rem): annotation chips, class tags, frame addresses, filter chips, legend, dates, captions.

### Named Rules
**The Mono Is Data Rule.** JetBrains Mono appears only on labels, class names, frame addresses, dates, counts and captions. Never on headings, paragraphs or buttons.

**The No Eyebrow Rule.** Section headings stand alone: no small uppercase kicker above them. The annotation chip is the only label that sits above a heading, and it is a class name, not a tagline.

## Layout

A centred container (max 1200px, 1rem gutter, 1.5rem from 576px). Mobile-first `min-width` breakpoints at 576, 768 and 960px. Sections pad `clamp(4.5rem, 9vw, 7.5rem)` vertically; a section head (title + lede, max 46rem) sits 2.5rem above its content.

- **Hero:** single column on mobile, two columns from 960px (`1fr` copy, 320–400px portrait frame at the end).
- **Work grid:** `auto-fill` columns of at least 330px, 1.5rem gap; cards stretch to equal height.
- **Timeline and skills:** ruled rows (1px top borders, closing bottom border). From 768px they become two-column rows (10rem date column; 15rem group column).
- **Contact:** stacked, then two equal columns from 960px with a 4rem gap.
- Sticky header 4.25rem tall; anchor scrolling is padded by it.

## Elevation & Depth

Flat and tonal. Depth comes from three stepped navy surfaces (ground, surface, raised) and 1px lines, not shadows. The single shadow is on the dialog, which floats over a scrim. The header gains a bottom line only after scrolling 20px.

### Shadow Vocabulary
- **Dialog lift** (`box-shadow: 0 24px 60px rgb(0 0 0 / 0.35)`): the modal panel only.

### Named Rules
**The Flat Page Rule.** Nothing on the page itself casts a shadow. Separate with surface steps and lines; reserve the shadow for content that sits above the page.

## Shapes

Two shape families that never mix. **Containers are soft:** cards and the form panel 16px, buttons, inputs and icon buttons 10px, skill items and dialog tags 8px. **Annotations are square:** boxes, label chips, class tags, filter chips, legend squares and flow-diagram steps have 0 radius and a single 2px stroke (`--stroke`). Other borders are 1px lines.

**The Square Box Rule.** An annotation box is never rounded and never thicker or thinner than 2px. If it has corners, it is a container, not an annotation.

## Components

### Annotation box and label chip (signature)
The core primitive. A box is a 2px square stroke in its class colour, sized to what it labels (a headline line, a face, a region of a screenshot). Its label chip is a filled rectangle in the same colour, sitting on the box's top-left edge (or under it when the label would leave the frame), mono 600 text in `tag-ink`, labels written like model output (`face · omar_haouache`, `dog · golden_retriever · 83%`). Boxes draw once: a clip-path wipe from the top-left corner (0.7s, `cubic-bezier(0.23, 1, 0.32, 1)`) staggered 0.18s per frame index, then the chip fades up 4px. Hero landmarks are 8px class-coloured dots ringed in the ground colour.

### Class tags
Small filled square chips (mono 600, 0.75rem) in the class colour, listed on each card and beside each skill group. An untyped tag (e.g. `internship`) uses the raised surface with body text colour.

### Buttons
- **Shape:** gently rounded (10px), 44px minimum height, 1px border, optional leading Boxicon.
- **Primary:** signal blue fill and border, `signal-blue-ink` text, 650 weight. One per group ("View projects", "View code").
- **Secondary:** surface fill, line border, ink text. Hover (fine pointers only): raised surface and a muted border; primary hover keeps its fill and swaps the border to ink.
- **Press:** `scale(0.97)` over 160ms on the custom ease-out; filter chips share it.
- **Card text buttons:** bare label + trailing icon (Details, Code, Demo), turning signal blue on hover. A missing demo shows a dimmed, non-interactive "Demo" (60% opacity, muted).

### Filter chips (the class legend as filter)
Square, 2px stroke in the class colour, mono label plus muted count. Inactive classes sit at 38% opacity as ghosts; active ones go to full opacity with a 14% class-colour wash. "all" uses ink. Selecting re-lays the grid with motion/react: `layout` on grid and items, `AnimatePresence mode="popLayout"`, enter/exit as opacity + `scale(0.96)`, spring with 0.35s visual duration and no bounce, exit 0.15s, all inside `MotionConfig reducedMotion="user"`.

### Cards / Containers
- **Corner Style:** 16px, overflow clipped.
- **Background:** surface, 1px line border; media panel 16:10 on the raised surface.
- **Media:** a real screenshot, optionally with annotation boxes in % of the frame. With no real screenshot, the panel draws the project's architecture: stacked square mono steps in the lead class colour joined by 2px connectors.
- **Frame address chip:** top-left, mono on the ground colour, `#001`–`#010` (plus `· internship`), fixed by list position so filtering never renumbers.
- **Hover:** on fine pointers the lead class's box draws around the media, inset 12px (0.45s).
- **Body:** 1.25rem padding; class tags, title, three-line summary, stack line (up to five technologies joined by middots), actions pinned to the bottom.
- **Shadow Strategy:** none (see Elevation).

### Inputs / Fields
- **Style:** ground-colour well inside the surface form panel, 1px line border, 10px radius, `0.8rem 1rem` padding; label above in ink 600.
- **Focus:** border turns signal blue plus the global 2px signal-blue focus outline.

### Navigation
Sticky header on the ground colour. Wordmark in Archivo 800 at 110% width. Section links (muted 550, ink on hover) appear from 960px; the active section gets a 2px signal-blue underline. GitHub and LinkedIn are always visible as 44px icon buttons (labels appear from 576px), plus a theme toggle that persists to `localStorage`.

### Dialog
Centred panel (max 40rem, 16px, surface) over the scrim, with the one shadow. Opens with a 220ms fade and the panel easing from `translateY(8px) scale(0.97)`; closes in 180ms. Feature bullets carry a signal-blue icon; technology tags are 8px-rounded outlined pills.

## Do's and Don'ts

### Do:
- **Do** label work the way a model would: a 2px square box in the class colour with a filled mono chip on its top-left corner.
- **Do** pick every category colour from the four annotation classes, and define any new class in both themes.
- **Do** show real screenshots or frames; when there is none, draw the architecture flow in the card panel.
- **Do** keep every project's frame address fixed (#001…) by its position in `projects.js`.
- **Do** draw each box once (clip-path from the top-left, 0.7s, `cubic-bezier(0.23, 1, 0.32, 1)`) and leave it still; disable the draw under `prefers-reduced-motion`.
- **Do** keep touch targets at 44px and gate hover effects behind `(hover: hover) and (pointer: fine)`.
- **Do** keep GitHub and LinkedIn in the header at every width.

### Don't:
- **Don't** use stock photography, illustrations or clip-art anywhere, including as a card placeholder.
- **Don't** put an eyebrow or kicker above a heading.
- **Don't** set headings, body copy or buttons in JetBrains Mono; mono is for labels and data.
- **Don't** show self-rated skill levels: no bars, percentages, stars or "expert" badges. Skills are plain lists grouped by class.
- **Don't** round an annotation box or chip, or draw one with any stroke other than 2px.
- **Don't** add shadows to on-page surfaces; only the dialog floats.
- **Don't** use a class colour as decoration or a second accent.
