# Powersthenics - Docker Deployment Guide

## Despliegue en Dokploy

Este proyecto está configurado para desplegarse en Dokploy usando Docker.

### Configuración del Proyecto en Dokploy

1. **URL del Dashboard**: https://powers-demo.diabolicalservices.tech/

2. **Repositorio Git**: 
   ```
   https://github.com/diabolicalprojects/Powersthenics.git
   ```

3. **Configuración del Contenedor**:

    | Parámetro | Valor |
    |-----------|-------|
    | **Branch** | `main` |
    | **Dockerfile Path** | `Dockerfile` (raíz del proyecto) |
    | **Port** | `80` |
    | **Build Command** | `npm run build` |
    | **Start Command** | `node server.js` |

### ✨ Característica: Enlace Único (Anti-Share)

Hemos implementado una lógica de seguridad para que las demos sean personales e intransferibles:

1. **Formato del Enlace**: Para enviar una demo a un cliente, añade un parámetro `t` (token) al final de la URL.
   - Ejemplo: `https://powers-demo.diabolicalservices.tech/?t=cliente123`
2. **Lógica de Bloqueo**: 
   - La **primera vez** que alguien abre el enlace con un token específico, este se vincula a su dirección IP.
   - Si ese mismo cliente intenta abrirlo desde otro dispositivo, o si comparte el enlace con alguien más, el servidor detectará una IP diferente y **bloqueará el acceso**.
3. **Persistencia**: La lista de bloqueos se guarda en `access_locks.json`, por lo que sobrevive a reinicios del servidor.


### Variables de Entorno (si son necesarias)

Actualmente la aplicación no requiere variables de entorno.

### Pasos de Despliegue

1. Inicia sesión en el dashboard de Dokploy: https://powers-demo.diabolinalservices.tech/

2. Crea un nuevo proyecto o selecciona uno existente

3. Añade un nuevo servicio de tipo **Application**

4. Configura la fuente como **Git Repository**

5. Ingresa la URL del repositorio: `https://github.com/diabolicalprojects/Powersthenics.git`

6. Selecciona la rama: `main`

7. Dokploy detectará automáticamente el `Dockerfile` en la raíz

8. Configura el puerto expuesto: `80`

9. Haz clic en **Deploy**

### Arquitectura del Dockerfile

El Dockerfile utiliza un enfoque de **multi-stage build**:

1. **Stage Builder**: 
   - Usa Node.js 20 Alpine para construir la aplicación
   - Instala dependencias y ejecuta `npm run build`
   - Genera los archivos estáticos optimizados en `/dist`

2. **Stage Production**:
   - Usa Nginx Alpine como servidor web
   - Sirve los archivos estáticos desde el builder
   - Configurado con gzip, caching y headers de seguridad
   - Soporta SPA routing (todas las rutas van a index.html)

### Comandos Útiles

**Build local del Docker image:**
```bash
docker build -t powersthenics .
```

**Run local:**
```bash
docker run -p 8080:80 powersthenics
```

**Usando Docker Compose:**
```bash
docker-compose up -d
```

### Estructura de Archivos Docker

```
Powersthenics/
├── Dockerfile          # Configuración del contenedor
├── nginx.conf          # Configuración de Nginx
├── .dockerignore       # Archivos excluidos del build
├── docker-compose.yml  # Orquestación local (opcional)
└── DEPLOY.md           # Esta guía
```

### Notas Importantes

- La aplicación es un SPA (Single Page Application) React + Vite
- El servidor Nginx está configurado para redirigir todas las rutas a `index.html`
- Los assets estáticos tienen caching de 1 año
- Incluye endpoint de health check en `/health`
