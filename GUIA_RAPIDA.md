# Guía rápida (Windows PowerShell)

1. Extraer ZIP y abrir su **carpeta raíz** en VS Code.
2. `cd frontend` → `npm install --package-lock-only` → `cd ..`.
3. Copiar `.env.example` → `.env` y reemplazar contraseñas y claves según README.
4. (Recomendado) Crear `backend/composer.lock` con el comando Docker del README.
5. `docker compose config`.
6. `docker compose up --build -d`.
7. `docker compose ps`.
8. Abrir http://localhost:3000/infra y http://localhost:8000/api/products.
9. Capturar Docker Desktop, las URLs y `docker compose ps` para la evidencia del proyecto.
10. `docker compose down` al terminar.

**Importante**: Compose usa **4 contenedores** para 3 capas lógicas; Nginx es la capa proxy necesaria. La tienda original tiene funcionalidades demo independientes, mientras `/infra` demuestra la comunicación real con Laravel y MySQL.
