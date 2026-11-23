# Tienda Demo — Next.js 16

Frontend académico de e-commerce con **API REST simulada**, catálogo, inicio de sesión de demostración, carrito, checkout ficticio e historial de compras.

## IMPORTANTE: límites de la simulación

- **NO** se conecta a Laravel 12 ni a Stripe real. No existe procesamiento de tarjetas ni pagos.
- La API `/api/products`, `/api/auth`, `/api/auth/login`, `/api/auth/register`, `/api/orders` y `/api/checkout` son endpoints de demostración internos.
- Las credenciales del usuario demo son públicas y **no deben reutilizarse en producción**.
- El registro crea una sesión ficticia y **no almacena contraseñas ni crea usuarios persistentes**.
- Las órdenes se guardan en una cookie `httpOnly` firmada por sesión (máximo cinco). No existe base de datos ni persistencia empresarial.
- No introduzcas información personal real ni tarjetas.
- La interfaz demuestra arquitectura y flujo; **no acredita integración Laravel/Swagger/Stripe auténtica**.

## Requisitos

Node.js 20.9+ (recomendado 22 o 24 LTS).

## Instalación

1. Copia `.env.example` como `.env.local`.
2. Deja `BASE_URL` vacío para utilizar la API interna simulada.
3. Sustituye `DEMO_SESSION_SECRET` por una cadena aleatoria de al menos 32 caracteres.
4. Ejecuta `npm install`.
5. Ejecuta `npm run dev`.
6. Abre `http://localhost:3000`.

Para generar un secreto en PowerShell puedes usar Node instalado:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado en `.env.local` (no subas ese archivo).

## Rutas de la interfaz

- `/` inicio
- `/catalogo` catálogo
- `/catalogo/p1` detalle de producto
- `/registro` sesión de registro simulada
- `/login` inicio de sesión demo
- `/carrito` carrito local
- `/checkout` compra ficticia
- `/checkout/confirmacion` recibo ficticio
- `/historial` historial protegido

## Endpoints simulados

- `GET /api/products` listado público
- `GET /api/auth` sesión de prueba
- `POST /api/auth/login` validar credenciales demo
- `POST /api/auth/register` validar registro temporal
- `GET /api/orders` historial autorizado
- `POST /api/orders` crear orden pendiente (sin guardado definitivo)
- `GET /api/checkout` información del modo de pago simulado
- `POST /api/checkout` confirmar pago ficticio

Las mutaciones de autenticación y órdenes se implementan mediante Server Actions que llaman a los endpoints REST internos; **no realizan llamadas a Laravel/Stripe**.

## Cuenta demo

Correo: `demo@tienda.test` — clave: `Demo12345!`.

## Verificaciones

```bash
npm run typecheck
npm run lint
npm run build
```

## Evidencias para la entrega

1. Pantallas del catálogo, login, carrito, checkout simulado, confirmación e historial.
2. Capturas verificables de los endpoints REST de demostración (`/api/...`). No etiquetarlas como Swagger Laravel.
3. Ejecutar Lighthouse en Chrome DevTools sobre la versión compilada (`npm run build` y `npm run start`) y guardar el reporte real; no inventar puntuaciones.
4. Adjuntar nota de alcance: el backend Laravel y el cobro real no se implementaron porque no se proporcionó la API previa.

## Próxima integración real

Para conectar con el backend real, sustituir las funciones en `lib/api.ts`, `lib/actions.ts` y `lib/session.ts` por clientes HTTP al `BASE_URL` real, gestionar autenticación y consumir los endpoints exactos definidos en Swagger. El contrato debe revisarse antes de programar esas integraciones.
