# Backend Implementation

This directory is for your backend implementation using JSON format.

## Structure

```
backend/
├── routes/        # API route handlers
├── controllers/   # Business logic controllers
├── services/      # Core business services
├── models/        # Data models
├── data/          # JSON data files
└── server.ts      # Main server file
```

## Getting Started

1. The server is already configured in `server.ts`
2. Add your API endpoints and JSON logic
3. Create your data models and JSON files in the `data/` directory
4. Implement your business logic in `services/` and `controllers/`

## Available Endpoints

- `GET /api/health` - Health check (already implemented)

## Add Your Endpoints Here

Example:
```typescript
app.post('/api/recommendations', (req: Request, res: Response) => {
  // Your JSON logic here
  res.json({ venues: [] });
});
```

## Running the Backend

```bash
npm run dev:backend
```

The server will run on `http://localhost:3001` by default.
