# Project Structure

## Current Organization
```
.
├── .git/                      # Version control
├── .kiro/                     # Kiro configuration and steering
│   └── steering/              # AI assistant guidance documents
├── node_modules/              # Dependencies (not in git)
├── dist/                      # Compiled output (not in git)
├── src/                       # Source code
│   ├── frontend/              # React frontend application
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── types/             # Frontend-specific types
│   │   ├── test/              # Test utilities
│   │   ├── App.tsx            # Root component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── backend/               # Express backend API
│   │   ├── routes/            # API route handlers
│   │   ├── controllers/       # Business logic controllers
│   │   ├── services/          # Backend services
│   │   ├── models/            # Data models
│   │   └── server.ts          # Server entry point
│   └── shared/                # Shared code between frontend and backend
│       ├── types/             # Common TypeScript interfaces
│       └── utils/             # Shared utilities
├── index.html                 # Frontend HTML entry
├── package.json               # Dependencies and scripts
├── tsconfig.json              # Base TypeScript configuration
├── tsconfig.frontend.json     # Frontend TypeScript config
├── tsconfig.backend.json      # Backend TypeScript config
├── vite.config.ts             # Vite and Vitest configuration
├── vitest.config.backend.ts   # Backend test configuration
├── .eslintrc.json             # ESLint configuration
├── .prettierrc.json           # Prettier configuration
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## Architecture

### Frontend (React + TypeScript)
- **Entry Point**: `src/frontend/main.tsx` renders the root `App` component
- **Components**: Reusable UI components organized by feature
- **Pages**: Top-level page components (Home, About, AI Chat)
- **Services**: API communication layer with backend
- **Types**: Frontend-specific TypeScript interfaces

### Backend (Express + TypeScript)
- **Entry Point**: `src/backend/server.ts` starts the Express server
- **Routes**: API endpoint definitions and routing
- **Controllers**: Business logic and request handling
- **Services**: Core business services (AI agent, recommendation engine)
- **Models**: Data models and database interactions

### Shared Code
- **Types**: Common interfaces used by both frontend and backend
- **Utils**: Shared utility functions and validation logic

## Separation of Concerns

### Frontend Responsibilities
- User interface rendering
- Form validation and state management
- API request formatting
- Response display and error handling
- Client-side routing

### Backend Responsibilities
- API endpoint handling
- Business logic execution
- Data filtering and recommendation generation
- AI agent processing
- Data persistence and retrieval

### Shared Responsibilities
- Type definitions for API contracts
- Common validation rules
- Utility functions used by both sides

## Conventions

### File Naming
- Components: PascalCase (e.g., `BudgetInputForm.tsx`)
- Services: camelCase (e.g., `apiService.ts`)
- Types: camelCase (e.g., `index.ts` in types directory)
- Tests: Same name as file with `.test.ts` or `.test.tsx` suffix

### Code Organization
- Co-locate tests with source files
- Group related functionality in directories
- Keep components small and focused
- Separate business logic from UI components

### TypeScript
- Use strict mode for maximum type safety
- Define interfaces in shared types for API contracts
- Avoid `any` type - use proper typing
- Use type inference where possible

### Testing
- Unit tests for specific examples and edge cases
- Property-based tests for universal correctness properties
- Test files co-located with source files
- Minimum 100 iterations for property tests

## Build Output

### Development
- Frontend: Served by Vite dev server with HMR (port 3000)
- Backend: Executed by tsx with watch mode (port 3001)

### Production
- Frontend: Static files in `dist/frontend/`
- Backend: Compiled JavaScript in `dist/backend/`
