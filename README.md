# Guide Écolo Thaïlande

Initiative de la liste **Écologie et Solidarité - Thaïlande Birmanie**.

## Stack
- Next.js 14 · Neon (PostgreSQL) · Vercel

## Setup

### 1. Base de données Neon
Aller dans le dashboard Neon > SQL Editor, coller le contenu de `schema.sql`.

### 2. Variables d'environnement
Copier `.env.example` en `.env.local` :
```
DATABASE_URL=postgresql://...
ADMIN_PASSWORD=ecobkk2026
NEXT_PUBLIC_SITE_URL=https://guide-ecolo-thailande.vercel.app
```

### 3. Lancer en local
```bash
npm install
npm run dev
```

### 4. Déployer sur Vercel
1. Pusher sur GitHub
2. Connecter sur vercel.com
3. Ajouter les variables d'environnement
4. Deploy !

## Backoffice
Bouton **Admin** en haut à droite. Mot de passe = `ADMIN_PASSWORD`.
