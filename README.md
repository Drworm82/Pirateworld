# Atlas Pirata (Frontend)

React + Vite que consume Supabase por REST.

## Variables de entorno

En Vercel/Netlify/StackBlitz añade:

- `VITE_SUPABASE_URL = https://igigwtxsgccudwqngxsf.supabase.co`
- `VITE_SUPABASE_ANON_KEY = <tu_anon_key>`

> **No** uses SERVICE_ROLE en el frontend.

## Scripts

- `npm run dev` – desarrollo local
- `npm run build` – compila a `dist`
- `npm run preview` – vista previa

## Rutas

- `/Auth` – iniciar sesión / registrarse
- `/Dashboard` – ver oro y ver anuncio (+100 oro)
- `/Parcels` – reclamar y listar parcelas

## Despliegue rápido

1. Conecta el repo a Vercel.
2. En **Environment Variables** agrega las 2 variables `VITE_...` de arriba.
3. Deploy.
