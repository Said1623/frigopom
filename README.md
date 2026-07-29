# FrigoPom — Application de gestion frigorifique multi-client

Application professionnelle de gestion d'unités frigorifiques pour pommes sous atmosphère contrôlée (AC/ULO), avec support multi-tenant et transition saisie manuelle → automate.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Backend | NestJS + TypeORM + PostgreSQL (Neon) |
| Frontend | React 18 + TypeScript + Vite + Recharts |
| Auth | JWT + Passport |
| Déploiement | Render (backend) + Vercel (frontend) |

## Structure du projet

```
frigopom/
├── backend/
│   └── src/
│       ├── auth/           # JWT, utilisateurs, rôles
│       ├── clients/        # Tenants (multi-client)
│       ├── unites/         # Unités frigorifiques
│       ├── chambres/       # Chambres + ConfigChambre
│       ├── mesures/        # Mesures manuelles / automate
│       ├── alarmes/        # Gestion alarmes
│       ├── stocks/         # Palettes / lots
│       └── rapports/       # Rapports (à compléter)
└── frontend/
    └── src/
        ├── pages/
        │   ├── auth/       # Login
        │   ├── dashboard/  # Vue globale
        │   ├── unites/     # Liste, détail, création
        │   ├── chambres/   # Monitoring, saisie manuelle
        │   ├── alarmes/    # Gestion alarmes
        │   ├── stocks/     # Gestion palettes
        │   └── config/     # Consignes, clients (super_admin)
        ├── services/       # api.ts (axios)
        ├── hooks/          # useAuth
        └── types/          # Types TypeScript
```

## Démarrage local

### Backend
```bash
cd backend
npm install
# Créer .env avec DATABASE_URL (Neon), JWT_SECRET
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
# Créer .env avec VITE_API_URL=http://localhost:3000/api
npm run dev
```

## Déploiement

### Render (backend)
- Build: `npm install && npm run build`
- Start: `npm start`
- Variables: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, `NODE_ENV=production`

### Vercel (frontend)
- Build: `npm run build`
- Output: `dist`
- Variable: `VITE_API_URL=https://votre-backend.onrender.com/api`

## Après déploiement

1. Exécuter `seed.sql` dans Neon SQL Editor
2. Se connecter avec `admin@frigopom.app` / `Admin1234!`
3. Créer un client → créer une unité → créer les chambres
4. Commencer la saisie manuelle des mesures

## Rôles utilisateurs

| Rôle | Droits |
|------|--------|
| `super_admin` | Accès total, gestion clients, toutes unités |
| `admin` | Gestion de son client (unités, users, config) |
| `operateur` | Saisie mesures, stocks, consultation alarmes |
| `lecteur` | Consultation uniquement |

## Phase 2 — Connexion automates

Chaque unité a un champ `source_donnees` (manuel / automate) et `automate_url`.
Quand les automates sont installés :
1. Mettre `source_donnees = 'automate'` via l'interface Config
2. Renseigner l'URL OPC-UA ou Modbus TCP
3. Créer un service de polling dans NestJS qui appelle `/api/mesures` avec `source: 'automate'`
4. L'historique et les alarmes fonctionnent identiquement

## API principale

```
POST   /api/auth/login
GET    /api/unites                    (filtrées par client JWT)
POST   /api/unites
GET    /api/chambres/unite/:id/dashboard
POST   /api/mesures                   (saisie ou automate)
GET    /api/mesures/chambre/:id/stats
GET    /api/alarmes/actives
PUT    /api/alarmes/:id/acquitter
GET    /api/stocks/unite/:id
POST   /api/stocks
```
