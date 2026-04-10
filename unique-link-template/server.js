import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;
const DATA_FILE = path.join(__dirname, 'access_locks.json');

// Initialize data file safely
function loadLocks() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify({}));
            return {};
        }
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        if (!content.trim()) {
            return {};
        }
        return JSON.parse(content);
    } catch (err) {
        console.error('Error loading locks file:', err);
        return {};
    }
}

// Logic for Unique Link
app.use((req, res, next) => {
    try {
        // Exclude static assets from lock logic
        if (req.path.includes('.') && !req.path.endsWith('.html')) {
            return next();
        }

        const token = req.query.t;
        // Get IP behind proxy
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const locks = loadLocks();

        if (!token) {
            return res.status(403).send(`
                <div style="font-family:sans-serif; text-align:center; padding:50px; background:#f0f0f0; height:100vh;">
                    <div style="max-width:500px; margin:auto; background:white; padding:40px; border-radius:15px; box-shadow:0 10px 30px rgba(0,0,0,0.05);">
                        <h1 style="color:#333;">Acceso Restringido</h1>
                        <p style="color:#666;">Este recurso requiere un enlace de acceso único generado para un prospecto específico.</p>
                    </div>
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
            console.log(`[AUTH] Token "${token}" successfully locked to IP: ${clientIp}`);
            return next();
        } else {
            // Subsequent access: Verify IP
            if (locks[token].ip === clientIp) {
                return next();
            } else {
                console.log(`[AUTH] Access denied for token "${token}". Original: ${locks[token].ip}, Current: ${clientIp}`);
                return res.status(403).send(`
                    <div style="font-family:sans-serif; text-align:center; padding:50px; background:#fff5f5; height:100vh; display:flex; align-items:center;">
                        <div style="max-width:500px; margin:auto; background:white; padding:40px; border-radius:15px; border:2px solid #feb2b2; box-shadow:0 10px 30px rgba(229, 62, 62, 0.1);">
                            <h1 style="color:#c53030; font-size:2em;">⚠️ Enlace No Válido</h1>
                            <p style="color:#742a2a; line-height:1.6; font-size:1.1em;">
                                Este enlace es <strong>personal e intransferible</strong>.<br> 
                                Ya ha sido utilizado desde otro dispositivo o ubicación.
                            </p>
                            <p style="color:#9b2c2c; font-size:0.9em; margin-top:20px; border-top:1px solid #fed7d7; pt:15px;">
                                Si eres el propietario legítimo y crees que esto es un error, contacta con el asesor que te envió el enlace.
                            </p>
                        </div>
                    </div>
                `);
            }
        }
    } catch (err) {
        console.error('Middleware Error:', err);
        next();
    }
});

// Serve the built React/Vite app
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA Fallback
app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Application build not found.');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[GATEWAY] Running on port ${PORT}`);
});
