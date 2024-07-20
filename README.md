This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`].

## pour installer Next
`npm install -g next`
## pour creer un projet NextJS
`npx create-next-app@latest`
## pour ajouter shadcn
`npx shadcn-ui@latest init`

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

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
│   │       │
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

## Le workflow gh action

pour que le server puisse ssh into gh

creer un fichier config dans `/home/pi/.ssh/config` avec:
```
Host github-megapi
	HostName github.com 
    AddKeysToAgent yes 
    PreferredAuthentications publickey 
    IdentityFile ~/.ssh/id_ed25519_gh_megapi
```
et une clé privée nommé `id_ed25519_gh_megapi`
// https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh