# Guía rápida de entrega

1. Abre la carpeta que contiene `package.json` en VS Code.
2. Copia `.env.example` a `.env.local`; cambia `DEMO_SESSION_SECRET` por secreto aleatorio de 32+ caracteres.
3. Ejecuta `npm install`, `npm run dev` y comprueba el flujo.
4. Ejecuta `npm run typecheck`, `npm run lint` y `npm run build`.
5. Ejecuta `npm run start`, abre Chrome y genera un reporte Lighthouse desde DevTools → Lighthouse. Guarda captura o HTML real.
6. Toma capturas del catálogo, detalle, login, carrito, confirmación e historial. Captura respuestas de `/api/products`, `/api/auth` y `/api/orders` en el navegador, aclarando que son endpoints simulados.
7. Sube a GitHub sin `.env.local` ni `node_modules`.
8. En una entrega describe explícitamente que Laravel y Stripe son simulaciones debido a que no se cuenta con la API previa; esto no sustituye la integración auténtica exigida en el enunciado.
