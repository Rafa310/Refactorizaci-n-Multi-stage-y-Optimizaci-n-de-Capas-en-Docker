# Tienda Kodigo — Ecosistema Docker (Next.js + Laravel 12 + MySQL)

Actividad de contenerización. Se reutiliza el frontend académico de **Tienda Demo** y se agrega una **API REST Laravel 12 mínima conectada a MySQL**. Laravel es una implementación nueva de demostración, no una API desarrollada anteriormente.

## Arquitectura

```text
Navegador -> localhost:3000 -> [Next.js / frontend]
                                    | consulta SSR desde /infra
                                    v
                        [Nginx / proxy: 80] <- localhost:8000
                                    |
                                    v FastCGI
                        [Laravel 12 / PHP-FPM:9000]
                                    |
                                    v SQL / TCP
                        [MySQL 8 / db:3306]
```

Tres **capas lógicas** (frontend, API, base de datos); cuatro contenedores porque Nginx se separa de PHP-FPM para cumplir el patrón de procesos independientes. MySQL no publica el puerto 3306 al host.

## Requisitos

- Docker Desktop con Compose v2 y motor Linux en ejecución.
- Node.js 20.9+ y npm **solo para generar el lockfile** antes del primer build (recomendado Node 22 LTS).
- Acceso a Docker Hub, Packagist y al registro npm durante el primer build.

## Instalación y ejecución

1. Extraer el ZIP y abrir la carpeta `tienda-docker-kodigo`.
2. **En `frontend/` ejecutar una sola vez `npm install --package-lock-only`.** Esto crea `package-lock.json` que el Dockerfile exige para builds reproducibles. Si ya existe lockfile propio validado, conservarlo.
3. En la raíz, copiar `.env.example` a `.env`.
4. Cambiar las contraseñas y generar las claves utilizando Node.js:

   ```powershell
   node -e "const c=require('crypto'); console.log('APP_KEY=base64:'+c.randomBytes(32).toString('base64')); console.log('DEMO_SESSION_SECRET='+c.randomBytes(32).toString('hex'))"
   ```

   Sustituir las dos líneas correspondientes en `.env` con los valores impresos. No compartir ni subir `.env`.
5. En la raíz del proyecto ejecutar:

   ```powershell
   docker compose config
   docker compose up --build -d
   docker compose ps
   ```

6. Abrir las URLs:

   - **Tienda**: http://localhost:3000
   - **Conexión real entre los contenedores**: http://localhost:3000/infra
   - **API Laravel**: http://localhost:8000/api/products
   - **Health Laravel + MySQL**: http://localhost:8000/api/health

   La primera construcción descarga las dependencias de Node y Composer. La base de datos se inicializa automáticamente solo cuando el volumen está vacío.

## ¿Qué cumple cada imagen?

**Frontend** (`frontend/Dockerfile`): 4 etapas `deps`, `builder`, `prod-deps` y `runner`. Copia manifests antes del código para aprovechar la caché; usa `npm ci` y `next build`. La imagen final ejecuta `next start` como usuario `node`, sin herramientas TypeScript/ESLint y solo con el `.next`, `public`, módulos de producción y manifiestos.

**Backend** (`backend/Dockerfile`): etapa PHP base con `pdo_mysql`, etapa Composer que resuelve `vendor/` sin dependencias de desarrollo y etapa final PHP-FPM como usuario no-root. No se copia el binario Composer ni herramientas de compilación a producción. `mbstring`, `openssl`, `xml`, `ctype`, `json` y `tokenizer` dependen de las extensiones disponibles en el PHP oficial; compruébalas con `php -m`.

**Nginx** (`nginx/default.conf`): proxy FastCGI hacia `backend:9000`, con acceso público solo a `public/index.php`.

**MySQL** (`mysql/Dockerfile`): imagen derivada de la oficial MySQL 8.0, con script SQL copiado a `/docker-entrypoint-initdb.d/`, `healthcheck`, volumen `mysql_data` y sin puerto publicado hacia el host.

## Advertencias y alcance

- La tienda reutilizada conserva catálogo, carrito, inicio de sesión y pagos **simulados** de la actividad previa. La página **/infra** sí consulta la API Laravel real y MySQL mediante la red privada de Compose. La tienda original no reemplaza sus operaciones por Laravel.
- **Reproducibilidad**: `frontend/package-lock.json` se genera localmente antes del build. `backend/composer.lock` no está incluido en este ZIP: debes generarlo con el paso recomendado de abajo y versionarlo en Git. Si no lo haces, Composer resolverá versiones al compilar, lo cual no garantiza repetibilidad entre builds.
- No instalar extensiones, exponer MySQL o permitir accesos a producción sin controles de seguridad adecuados. Este es un **entorno académico local**, no un despliegue endurecido y auditado de producción.
- No ejecutar `docker compose down -v` salvo que quieras **borrar los datos de la base**.

## Generar composer.lock (recomendado antes del build)

Desde la raíz, con Docker Desktop activo:

```powershell
docker run --rm -v "${PWD}/backend:/app" -w /app composer:2 sh -lc "composer update --no-scripts --no-interaction --prefer-dist --no-progress --ignore-platform-req=ext-pdo_mysql"
```

El lockfile generado queda en `backend/composer.lock`. Revísalo y súbelo a GitHub. Composer verificará las extensiones al instalar dentro de Docker; `--ignore-platform-req` se usa solo en el contenedor temporal de Composer que carece de `pdo_mysql`. Esta preparación puede fallar por versiones o acceso a la red, en cuyo caso comparte el error exacto.

## Verificación

```powershell
docker compose ps
docker compose logs --tail=50 backend
docker compose logs --tail=50 frontend
docker compose exec backend php artisan route:list
docker compose exec backend php -m
```

Para parar:

```powershell
docker compose down
```

El comando `docker compose down` conserva el volumen de MySQL por defecto.

## Fuentes técnicas

- https://docs.docker.com/guides/nextjs/
- https://docs.docker.com/compose/how-tos/startup-order/
- https://laravel.com/docs/12.x/deployment
