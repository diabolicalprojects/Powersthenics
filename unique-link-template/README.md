# Template: Enlace Único (Anti-Share) para Demos

Este blueprint permite convertir cualquier aplicación estática (React, Vue, Vite, etc.) en un portal de demos con acceso restringido por IP.

## Contenido del Template

1. **`server.js`**: El corazón del sistema. Un Gateway en Node.js/Express que maneja la lógica de bloqueo de IP.
2. **`Dockerfile`**: Configuración optimizada para compilar el frontend y servirlo con el Gateway.
3. **`docker-compose.yml`**: Configuración para despliegue rápido con persistencia de datos.

## Cómo implementarlo en un nuevo proyecto

1. Copia estos 3 archivos a la raíz de tu nuevo proyecto.
2. Asegúrate de que tu proyecto sea un SPA que genere sus archivos en una carpeta llamada `dist` (o ajusta la ruta en `server.js`).
3. Instala express: `npm install express`.
4. Añade `"type": "module"` a tu `package.json` para soportar ES Modules.
5. Despliega usando Docker.

## Personalización
Puedes editar `server.js` para cambiar los mensajes de error o añadir nuevas reglas de seguridad (como expiración por tiempo).
