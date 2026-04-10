import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;
const DATA_FILE = path.join(__dirname, 'access_locks.json');

// Ensure data file exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
}

// Logic for Unique Link
app.use((req, res, next) => {
    // Exclude static assets from lock logic (optional, but cleaner for resources)
    if (req.path.includes('.') && !req.path.endsWith('.html')) {
        return next();
    }

    const token = req.query.t;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Load current locks
    const locks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    if (!token) {
        // If no token, we can decide to block OR allow general viewing.
        // User asked for "prospectos no puedan compartir", implying the token identifies the prospect.
        // Let's allow access ONLY with a token for demos.
        return res.status(403).send(`
            <div style="font-family:sans-serif; text-align:center; padding:50px;">
                <h1>Acceso Denegado</h1>
                <p>Este recurso requiere un enlace de acceso único.</p>
            </div>
        `);
    }

    if (!locks[token]) {
        // First access: LOCK the token to this IP
        locks[token] = {
            ip: clientIp,
            firstAccess: new Date().toISOString(),
            userAgent: req.headers['user-agent']
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(locks, null, 2));
        console.log(`Token ${token} locked to IP ${clientIp}`);
        return next();
    } else {
        // Subsequent access: Verify IP
        if (locks[token].ip === clientIp) {
            return next();
        } else {
            console.log(`Access denied for token ${token}. Original: ${locks[token].ip}, Current: ${clientIp}`);
            return res.status(403).send(`
                <div style="font-family:sans-serif; text-align:center; padding:50px; background:#f8d7da; color:#721c24; border-radius:10px; margin:20px;">
                    <h1>⚠️ Enlace No Válido</h1>
                    <p>Este enlace es personal e intransferible. Ya ha sido utilizado desde otro dispositivo.</p>
                    <p style="font-size:0.8em;">Si crees que esto es un error, contacta con tu asesor comercial.</p>
                </div>
            `);
        }
    }
});

// Serve the built React/Vite app
app.use(express.static(path.join(__dirname, 'dist')));

// SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gateway server running on port ${PORT}`);
});
