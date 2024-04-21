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
├── app
│   │
│   ├── (auth)
│   │   └── (routes)
│   │       ├── layout.tsx
│   │       ├── sign-in
│   │       │   └── page.tsx
│   │       └── sign-up
│   │           └── page.tsx
│   │
│   ├── (homepage)
│   │   └── homepage
│   │       ├── albumsByArtist
│   │       │   └── page.tsx
│   │       ├── byartist
│   │       │   └── page.tsx
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── random-song
│   │           └── page.tsx
│   │
│   ├── (landingpage)
│   │   ├── LandingLayout.tsx
│   │   └── page.tsx
│   │
│   ├── node_modules
│   ├── layout.tsx
│   ├── favicon.ico
│   └──globals.css
│
├── components
│   ├── AlbumsByArtist.tsx
│   ├── AllArtist.tsx
│   ├── Box.tsx
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── LandingHero.tsx
│   ├── LandingNavbar.tsx
│   ├── Library.tsx
│   ├── ListItem.tsx
│   ├── MusicSimImage.tsx
│   ├── ParticuleRing.tsx
│   ├── RandomSong.tsx
│   ├── Sidebaritem.tsx
│   ├── Sidebar.tsx
│   └── ui
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx
│
├── lib
│   └── utils.ts
│
├── components.json
├── docker-compose.yaml
├── Dockerfile
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```