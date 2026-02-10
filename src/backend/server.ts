import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = parseInt(process.env.SERVER_PORT || '3001', 10);
const HOST = process.env.SERVER_HOST || 'localhost';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Event Planning Platform API is running' });
});

// TODO: Implement your backend logic here
// Add your JSON format endpoints and logic below

// Start server
app.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  Event Planning Platform API Server                       ║
╚════════════════════════════════════════════════════════════╝

✓ Server is running on http://${HOST}:${PORT}
✓ Environment: ${process.env.NODE_ENV || 'development'}

📡 Health Check: http://${HOST}:${PORT}/api/health
  `);
});

export default app;
