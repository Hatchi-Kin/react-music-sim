# React-Music-Sim (Next.js, React, TypeScript, TailwindCSS)

React-Music-Sim est une application web de recommandation musicale de pointe. Elle permet aux utilisateurs authentifiés d'explorer une vaste bibliothèque de chansons avec une interface moderne et intuitive. L'application utilise un réseau de neurones convolutifs (CNN) pour prédire les genres musicaux en se basant sur leurs spectrogrammes. Ces représentations vectorielles des chansons sont stockées dans une base de données vectorielle (Milvus), qui alimente la fonctionnalité de recherche de similarité pour générer des recommandations musicales personnalisées. De plus, l'application inclut un lecteur de musique entièrement fonctionnel et une fonctionnalité de playlist pour une expérience utilisateur améliorée.

**Note :** Ce projet repose sur un serveur backend, que vous pouvez trouver ici : [megapi](https://github.com/Hatchi-Kin/megapi).

## Technologies Utilisées

- **Front-end :** React, TypeScript, TailwindCSS
- **Build et Développement :** Next.js

## Installation

### Prérequis

- Node.js
- npm

### Étapes d'installation

1. Installer Next.js globalement :
    ```bash
    npm install -g next
    ```

2. Créer un projet Next.js :
    ```bash
    npx create-next-app@latest
    ```

3. Ajouter shadcn :
    ```bash
    npx shadcn-ui@latest init
    ```

## Démarrage

Pour démarrer le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.


## Structure du Projet

```bash
.
├── .github
│   └── workflows
│       └── deploy_aspire.yaml
│
├── app
│   ├── (auth)
│   │   └── (routes)
│   │       ├── layout.tsx
│   │       ├── sign-in
│   │       └── sign-up
│   │
│   ├── (homepage)
│   │   └── homepage
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       ├── albumsByArtist
│   │       ├── byartist
│   │       ├── random-song
│   │       ├── similar-songs
│   │       ├── similar-spotinite
│   │       ├── similar-to-user-uploads
│   │       ├── tracklist
│   │       ├── user-favorites
│   │       └── user-uploads
│   │
│   ├── (landingpage)
│   │   ├── LandingLayout.tsx
│   │   └── page.tsx
│   │
│   ├── favicon.ico
│   ├── global.css
│   ├── globals.css
│   └── layout.tsx
│
├── components
│   ├── AddRemoveFavoritesButton.tsx
│   ├── AddToPlayList.tsx
│   ├── AlbumsByArtist.tsx
│   ├── AllArtists.tsx
│   ├── Box.tsx
│   ├── Button.tsx
│   ├── CompareModels.tsx
│   ├── GenresPlots.tsx
│   ├── Header.tsx
│   ├── LandingHero.tsx
│   ├── LandingNavbar.tsx
│   ├── ListItem.tsx
│   ├── MusicPlayer.tsx
│   ├── MyFavorites.tsx
│   ├── ParticuleRing.tsx
│   ├── RandomSong.tsx
│   ├── Sidebar.tsx
│   ├── Sidebaritem.tsx
│   ├── SimilarSongs.tsx
│   ├── SimilarToUserUploadsSongs.tsx
│   ├── Spinner.tsx
│   ├── SpotiniteSimilar.tsx
│   ├── TrackList.tsx
│   ├── UserUploads.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx
│
├── contexts
│   ├── AlbumContext.tsx
│   ├── AlbumProvider.tsx
│   ├── ArtistContext.tsx
│   ├── ArtistProvider.tsx
│   ├── PlayListContext.tsx
│   ├── PlayListProvider.tsx
│   ├── SimilarSongsContext.tsx
│   └── SimilarSongsProvider.tsx
│
├── lib
│   └── utils.ts
│
├── .dockerignore
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── components.json
├── postcss.config.js
├── tailwind.config.ts
├── next.config.mjs
├── Dockerfile
├── docker-compose.yaml
└── README.md
```

## Workflow GitHub Actions

Pour que le serveur puisse se connecter à GitHub via SSH, créez un fichier de configuration dans `/home/user/.ssh/config` avec le contenu suivant :

```
Host github-megapi
	HostName github.com 
    AddKeysToAgent yes 
    PreferredAuthentications publickey 
    IdentityFile ~/.ssh/id_ed25519_gh_megapi
```

Et une clé privée nommée `id_ed25519_gh_megapi`. Pour plus d'informations, consultez la documentation GitHub : [Connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).
