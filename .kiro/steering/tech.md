# Technology Stack

## Current State
Project initialization complete. Full-stack TypeScript application with React frontend and Express backend.

## Technology Stack

### Frontend
- **React 18.2** - UI framework with hooks and modern patterns
- **TypeScript 5.3** - Type-safe development
- **Vite 5.0** - Fast build tool and dev server with HMR
- **React Router 6.20** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express 4.18** - Web framework for REST API
- **TypeScript 5.3** - Type-safe development
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Testing
- **Vitest 1.0** - Fast unit testing framework with Vite integration
- **fast-check 3.15** - Property-based testing library
- **@testing-library/react 14.1** - React component testing utilities

### Development Tools
- **tsx** - TypeScript execution and watch mode
- **ESLint 8.56** - Code linting
- **Prettier 3.1** - Code formatting
- **concurrently** - Run multiple dev servers

## Common Commands

### Development
```bash
npm run dev              # Start both frontend and backend servers
npm run dev:frontend     # Start frontend only (port 3000)
npm run dev:backend      # Start backend only (port 3001)
```

### Building
```bash
npm run build            # Build both frontend and backend
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only
```

### Testing
```bash
npm test                 # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
```

### Code Quality
```bash
npm run lint             # Lint code
npm run format           # Format code with Prettier
```

### Production
```bash
npm start                # Start production server
```

## Project Structure
```
src/
├── frontend/           # React frontend application
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── types/          # Frontend-specific types
│   └── test/           # Test utilities
├── backend/            # Express backend API
│   ├── routes/         # API route handlers
│   ├── controllers/    # Business logic controllers
│   ├── services/       # Backend services
│   └── models/         # Data models
└── shared/             # Shared types and utilities
    └── types/          # Common TypeScript interfaces
```

## Configuration Files
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.frontend.json` - Frontend-specific TS config
- `tsconfig.backend.json` - Backend-specific TS config
- `vite.config.ts` - Vite and Vitest configuration
- `.env` - Environment variables (not in git)
- `.env.example` - Environment template

## Notes
- TypeScript provides end-to-end type safety across frontend and backend
- Shared types in `src/shared/types` ensure API contract consistency
- Vite provides fast HMR for rapid frontend development
- Property-based testing with fast-check ensures robust validation
- Configurable server IP/port supports various deployment scenarios
- CORS configured for local development with frontend on port 3000
