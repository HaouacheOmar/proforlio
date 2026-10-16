# Ajouter un projet dans "Recent Works"

Pour ajouter un projet, tu ne touches qu'à **un seul fichier de code**, [`src/data/projects.js`](src/data/projects.js), plus l'image du projet. La carte, le bouton **Details**, le bouton **Demo**, la modale et le filtre sont générés automatiquement.

## Résumé rapide

1. Mettre l'image dans `public/assets/img/`.
2. Ajouter un objet dans `src/data/projects.js`.
3. Tester avec `npm run dev`.
4. `git add . && git commit -m "Add <projet>" && git push` : Vercel redéploie tout seul.

Le détail de chaque étape suit.

---

## Étape 1 : Ajouter l'image

Mets la capture d'écran du projet dans le dossier **`public/assets/img/`**.

- **Nom de fichier :** sans espaces ni accents, par exemple `chat-app.png` ou `chat-app.jpg`.
- **Majuscules :** fais attention. Vercel tourne sous Linux, où `Chat.png` et `chat.png` sont deux fichiers différents. En local sous Windows ça marchera dans les deux cas, mais en ligne l'image sera cassée si la casse ne correspond pas exactement.
- **Format :** la carte affiche l'image en **4:3** et rogne le reste. Une image en 4:3 (par exemple 1200 × 900) s'affiche donc entière.

## Étape 2 : Ouvrir le fichier des projets

Ouvre [`src/data/projects.js`](src/data/projects.js). C'est une liste d'objets entre `[` et `]`, un objet par projet, **dans l'ordre d'affichage**. Si tu places ton projet en premier dans la liste, il apparaît en premier sur le site.

## Étape 3 : Ajouter ton projet

Copie ce modèle à l'endroit voulu dans la liste, puis remplace les valeurs :

```js
  {
    title: "Chat App",
    category: "sidework",
    image: "/assets/img/chat-app.png",
    demo: "https://chat-app.vercel.app",
    github: "https://github.com/HaouacheOmar/chat-app",
    description: "A real-time chat application with private rooms and notifications.",
    features: [
      { label: "Real time", text: "messages delivered instantly over WebSockets." },
      { label: "Backend", text: "Django REST API with JWT authentication." },
      "Users can create private rooms and invite friends.",
    ],
    tags: ["Python", "Django", "React", "Redis"],
  },
```

### Ce que fait chaque champ

| Champ | Où ça s'affiche | À savoir |
|---|---|---|
| `title` | Titre de la carte **et** de la modale | Doit être **unique** : React s'en sert pour identifier la carte |
| `category` | Filtres *Internship* / *Side Work* | `"intern"` ou `"sidework"`, rien d'autre (voir l'étape 5 pour en créer une) |
| `image` | Image de la carte | Commence par `/assets/img/`, **sans** `public/` |
| `demo` | Bouton **Demo**, à droite de la carte | URL = lien actif qui s'ouvre dans un nouvel onglet. `""` = bouton grisé "bientôt disponible" |
| `github` | Bouton **View on GitHub** dans la modale | `""` = le bouton n'apparaît pas |
| `description` | Premier paragraphe de la modale | |
| `features` | Liste à puces ✓ de la modale | Deux formes possibles (voir ci-dessous) |
| `tags` | Pastilles des technologies dans la modale | |

### Les deux formes de `features`

- **Avec un titre en gras :**
  ```js
  { label: "Backend", text: "Django REST API." }
  ```
  s'affiche **Backend:** Django REST API.
- **Sans titre**, une simple chaîne :
  ```js
  "Users can create private rooms."
  ```

Tu peux mélanger les deux formes dans la même liste.

## Étape 4 : Vérifier la syntaxe

Ce sont les erreurs les plus fréquentes :

- **La virgule `,` après le `}`** qui ferme ton objet. Sans elle, tout le site plante.
- **Les guillemets** autour de chaque texte : `"comme ça"`. Les apostrophes à l'intérieur ne posent pas de problème : `"the manager's dashboard"`.
- **Ne supprime aucun champ.** Si tu n'as rien à mettre, laisse-le vide :
  ```js
  demo: "",
  github: "",
  features: [],
  tags: [],
  ```
  Si tu supprimes la ligne `tags`, la page plante.

## Étape 5 (optionnelle) : Créer une nouvelle catégorie

Si tu veux un filtre en plus (par exemple *Freelance*), ouvre [`src/components/Work.jsx`](src/components/Work.jsx) et ajoute une ligne dans `FILTERS` :

```js
const FILTERS = [
  { value: "all", label: "All" },
  { value: "intern", label: "Internship" },
  { value: "sidework", label: "Side Work" },
  { value: "freelance", label: "Freelance" },   // ← nouveau
];
```

- `value` est ce que tu écris dans `category` de tes projets.
- `label` est le texte du bouton de filtre.

Ensuite, utilise `category: "freelance"` dans tes projets.

## Étape 6 : Tester en local

La première fois seulement, installe les dépendances :

```bash
npm install
```

Puis lance le serveur de développement :

```bash
npm run dev
```

Ouvre l'adresse affichée (en général http://localhost:5173) et va dans **Recent Works**. Vérifie que :

1. la carte apparaît avec la bonne image ;
2. **Details** ouvre la modale avec ta description, tes points et tes tags ;
3. **Demo** ouvre bien ton site dans un nouvel onglet (ou est grisé si `demo: ""`) ;
4. **View on GitHub** pointe vers le bon repo ;
5. le projet apparaît dans le bon filtre (*Internship* ou *Side Work*).

Le serveur se met à jour tout seul à chaque sauvegarde, sans avoir à le relancer.

**Si la page devient blanche**, tu as presque toujours oublié une virgule ou un guillemet. Le terminal et la console du navigateur (touche **F12**, onglet *Console*) indiquent le fichier et la ligne fautive.

Pour tester la version de production (celle que Vercel va servir) :

```bash
npm run build
npm run preview
```

## Étape 7 : Mettre en ligne

```bash
git add .
git commit -m "Add Chat App project"
git push
```

Une fois le repo connecté à Vercel, chaque `push` sur `main` redéploie le site automatiquement en une minute environ. Il n'y a pas de build à lancer à la main.

---

## Cas fréquents

### Ajouter la démo d'un projet déjà présent

Dans `src/data/projects.js`, remplace `demo: ""` par l'URL du projet :

```js
demo: "https://mon-projet.vercel.app",
```

Le bouton Demo devient cliquable tout seul.

### Changer l'ordre des projets

Déplace l'objet du projet plus haut ou plus bas dans la liste. L'ordre du fichier est l'ordre d'affichage.

### Retirer un projet

Supprime son objet, des accolades `{` à `},` incluses. Tu peux aussi supprimer son image dans `public/assets/img/`.

### Changer l'image d'un projet

Mets la nouvelle image dans `public/assets/img/` et mets à jour le champ `image`. Si tu gardes le même nom de fichier, il suffit de remplacer le fichier.

---

## Pour aller plus loin

Les autres sections fonctionnent de la même façon, avec un fichier de données chacune :

| Section | Fichier |
|---|---|
| Recent Works | [`src/data/projects.js`](src/data/projects.js) |
| What I Offer (services) | [`src/data/services.js`](src/data/services.js) |
| My Experience (compétences) | [`src/data/skills.js`](src/data/skills.js) |

Dans `skills.js`, chaque compétence est `{ name: "React", level: "Advanced" }`. La liste se répartit automatiquement sur deux colonnes.
