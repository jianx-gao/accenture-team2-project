# Event Planning Platform

An AI-powered event planning platform that helps event planners manage budgets and receive intelligent recommendations for venues, food, and decor options.

## Features

- **Budget Management**: Input event constraints including time range, budget limits, location, and attendee capacity
- **AI-Powered Recommendations**: Get intelligent suggestions for venues, food, and decor based on your constraints
- **Interactive Chat**: Communicate with an AI assistant for personalized event planning guidance
- **Real-time Updates**: Dynamic recommendation updates as you adjust your constraints

## Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe development
- **CORS** - Cross-origin resource sharing

### Testing
- **Vitest** - Unit testing framework
- **fast-check** - Property-based testing library
- **@testing-library/react** - React component testing

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-planning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Edit `.env` file to configure server settings:
```env
SERVER_HOST=localhost    # Server IP address (use 0.0.0.0 for all interfaces)
SERVER_PORT=3001        # Backend server port
FRONTEND_URL=http://localhost:3000  # Frontend URL for CORS
NODE_ENV=development    # Environment mode
```

## Development

### Start Both Frontend and Backend (Recommended)
```bash
npm run dev
```
This starts both the backend API server (port 3001) and frontend dev server (port 3000) concurrently.

### Start Backend Only
```bash
npm run dev:backend
```
Backend API will be available at `http://localhost:3001`

### Start Frontend Only
```bash
npm run dev:frontend
```
Frontend will be available at `http://localhost:3000`

## Building for Production

### Build Everything
```bash
npm run build
```

### Build Frontend Only
```bash
npm run build:frontend
```

### Build Backend Only
```bash
npm run build:backend
```

## Running Production Build

After building, start the production server:
```bash
npm start
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Code Quality

### Lint Code
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

## Project Structure

```
event-planning-platform/
├── src/
│   ├── frontend/          # React frontend application
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # Frontend-specific types
│   │   └── test/          # Test utilities
│   ├── backend/           # Express backend API
│   │   ├── routes/        # API route handlers
│   │   ├── controllers/   # Business logic controllers
│   │   ├── services/      # Backend services
│   │   └── models/        # Data models
│   └── shared/            # Shared types and utilities
│       ├── types/         # Common TypeScript interfaces
│       └── utils/         # Shared utility functions
├── dist/                  # Compiled output
├── index.html             # Frontend entry HTML
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.frontend.json # Frontend-specific TS config
├── tsconfig.backend.json  # Backend-specific TS config
├── vite.config.ts         # Vite configuration
└── vitest.config.backend.ts # Backend test configuration
```

For detailed information about the project structure, architecture principles, and organization guidelines, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Get Recommendations
```
POST /api/recommendations
```
Request body:
```json
{
  "timeRange": {
    "startDate": "2024-06-01",
    "endDate": "2024-06-03"
  },
  "budget": {
    "min": 5000,
    "max": 10000
  },
  "location": "New York",
  "attendees": 100,
  "foodOptions": ["buffet", "vegetarian"],
  "decorOptions": ["modern", "elegant"]
}
```

### Chat with AI
```
POST /api/chat
```
Request body:
```json
{
  "message": "What venues do you recommend for a wedding?",
  "context": { /* optional event constraints */ }
}
```

## Configuration

### Server Configuration

The backend server supports flexible deployment configurations through environment variables:

#### IP Address Configuration (`SERVER_HOST`)

- **Local only** (default): `SERVER_HOST=localhost` or `SERVER_HOST=127.0.0.1`
  - Server only accessible from the same machine
  - Best for development and testing
  
- **All network interfaces**: `SERVER_HOST=0.0.0.0`
  - Server accessible from any network interface
  - Useful for testing on mobile devices or other computers on the same network
  - When using `0.0.0.0`, the server will display all accessible network IP addresses on startup
  
- **Specific IP**: `SERVER_HOST=192.168.1.100`
  - Bind to a specific network interface
  - Useful for multi-homed servers

#### Port Configuration (`SERVER_PORT`)

- Default: `3001`
- Choose any available port between 1024-65535
- Example: `SERVER_PORT=8080`

#### Server Startup Logging

When the server starts, it displays:
- ✓ Configured host and port
- ✓ Environment mode (development/production)
- ✓ Available API endpoints
- ✓ Accessible URLs (including network IPs when using `0.0.0.0`)

Example output:
```
╔════════════════════════════════════════════════════════════╗
║  Event Planning Platform API Server                       ║
╚════════════════════════════════════════════════════════════╝

✓ Server is running
✓ Host: 0.0.0.0
✓ Port: 3001
✓ Environment: development

📡 API Endpoints:
   - Health Check: http://0.0.0.0:3001/api/health
   - Recommendations: http://0.0.0.0:3001/api/recommendations
   - Chat: http://0.0.0.0:3001/api/chat

🌐 Accessible at:
   - Local: http://localhost:3001
   - Network: http://192.168.1.100:3001
```

### CORS Configuration

Update `FRONTEND_URL` in `.env` to match your frontend deployment URL for proper CORS handling:

```env
# For local development
FRONTEND_URL=http://localhost:3000

# For network access
FRONTEND_URL=http://192.168.1.100:3000

# For production
FRONTEND_URL=https://your-domain.com
```

### Environment Variables Reference

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `SERVER_HOST` | IP address to bind the server | `localhost` | `0.0.0.0`, `127.0.0.1` |
| `SERVER_PORT` | Port number for the server | `3001` | `8080`, `3000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | `http://192.168.1.100:3000` |
| `NODE_ENV` | Environment mode | `development` | `production`, `test` |

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Submit a pull request

## License

MIT
