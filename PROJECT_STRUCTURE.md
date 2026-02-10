# Event Planning Platform - Project Structure

This document describes the complete directory structure and organization of the event planning platform codebase.

## Overview

The project follows a full-stack TypeScript architecture with clear separation between frontend (React), backend (Express), and shared code.

## Directory Structure

```
src/
├── frontend/              # React frontend application
│   ├── components/        # Reusable UI components
│   │   └── README.md      # Component organization guide
│   ├── pages/             # Top-level page components
│   │   └── README.md      # Page structure guide
│   ├── services/          # API communication services
│   │   └── README.md      # Service organization guide
│   ├── types/             # Frontend-specific TypeScript types
│   │   └── README.md      # Type organization guide
│   ├── test/              # Test utilities and setup
│   │   └── setup.ts       # Test configuration
│   ├── App.tsx            # Root React component
│   ├── main.tsx           # Frontend entry point
│   └── index.css          # Global styles
│
├── backend/               # Express backend API
│   ├── routes/            # API route handlers
│   │   └── README.md      # Route organization guide
│   ├── controllers/       # Business logic controllers
│   │   └── README.md      # Controller organization guide
│   ├── services/          # Core business services
│   │   └── README.md      # Service organization guide
│   ├── models/            # Data models and persistence
│   │   └── README.md      # Model organization guide
│   └── server.ts          # Backend entry point
│
└── shared/                # Shared code between frontend and backend
    ├── types/             # Common TypeScript interfaces
    │   ├── index.ts       # Shared type definitions
    │   └── index.test.ts  # Type validation tests
    └── utils/             # Shared utility functions
        └── validation.test.ts  # Validation utility tests
```

## Architecture Principles

### Separation of Concerns

**Frontend Responsibilities:**
- User interface rendering and interaction
- Form validation and state management
- API request formatting
- Response display and error handling
- Client-side routing

**Backend Responsibilities:**
- API endpoint handling
- Business logic execution
- Data filtering and recommendation generation
- AI agent processing
- Data persistence and retrieval

**Shared Responsibilities:**
- Type definitions for API contracts
- Common validation rules
- Utility functions used by both sides

### Code Organization

1. **Co-location**: Tests are placed alongside source files using `.test.ts` or `.test.tsx` suffix
2. **Feature-based**: Related functionality is grouped in directories
3. **Single Responsibility**: Components, services, and modules focus on one task
4. **Type Safety**: Shared types ensure API contract consistency

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `BudgetInputForm.tsx`)
- **Services**: camelCase (e.g., `apiService.ts`)
- **Models**: camelCase (e.g., `venueModel.ts`)
- **Routes**: camelCase (e.g., `recommendationRoutes.ts`)
- **Controllers**: camelCase (e.g., `recommendationController.ts`)
- **Tests**: Same name as file with `.test.ts` or `.test.tsx` suffix

### Directories
- Use lowercase with hyphens for multi-word directories (if needed)
- Keep directory names descriptive and concise

## Key Directories

### Frontend Components (`src/frontend/components/`)
Reusable UI components organized by feature:
- Form components (input fields, validation displays)
- Navigation components (navigation bar, links)
- Display components (recommendation cards, lists)
- Chat components (message display, input)
- Layout components (hero section, containers)

### Frontend Pages (`src/frontend/pages/`)
Top-level page components:
- **Home Page**: Budget input form and recommendation display
- **About Page**: Platform information
- **AI Chat Page**: Interactive chat interface

### Frontend Services (`src/frontend/services/`)
API communication and business logic:
- **API Service**: HTTP client for backend communication
- **Recommendation Service**: Handles recommendation requests
- **Chat Service**: Manages chat API interactions

### Backend Routes (`src/backend/routes/`)
API endpoint definitions:
- **Recommendation Routes**: `/api/recommendations` endpoint
- **Chat Routes**: `/api/chat` endpoint
- **Health Routes**: `/api/health` endpoint

### Backend Controllers (`src/backend/controllers/`)
Business logic orchestration:
- **Recommendation Controller**: Processes recommendation requests
- **Chat Controller**: Handles chat message processing
- **Validation Controller**: Request validation logic

### Backend Services (`src/backend/services/`)
Core business capabilities:
- **AI Agent Service**: Agentic AI logic for processing constraints
- **Recommendation Engine**: Filters and ranks options
- **Data Store Service**: Manages data access and queries

### Backend Models (`src/backend/models/`)
Data structures and persistence:
- **Venue Model**: Venue data and queries
- **Food Model**: Food option data and queries
- **Decor Model**: Decor option data and queries

### Shared Types (`src/shared/types/`)
Common TypeScript interfaces:
- `EventConstraints`: User input constraints
- `VenueOption`, `FoodOption`, `DecorOption`: Data models
- `RecommendationRequest`, `RecommendationResponse`: API contracts
- `ChatMessage`, `ChatRequest`, `ChatResponse`: Chat interfaces
- `ValidationResult`, `ErrorResponse`: Error handling types

### Shared Utils (`src/shared/utils/`)
Common utility functions:
- Validation helpers
- Data transformation utilities
- Common business logic

## Testing Structure

Tests are co-located with source files:
- Unit tests: `*.test.ts` or `*.test.tsx`
- Property-based tests: Use `fast-check` library
- Test utilities: `src/frontend/test/setup.ts`

## Build Output

### Development
- Frontend: Served by Vite dev server with HMR (port 3000)
- Backend: Executed by tsx with watch mode (port 3001)

### Production
- Frontend: Static files in `dist/frontend/`
- Backend: Compiled JavaScript in `dist/backend/`

## Configuration Files

Located in project root:
- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.frontend.json`: Frontend-specific TS config
- `tsconfig.backend.json`: Backend-specific TS config
- `vite.config.ts`: Vite and Vitest configuration
- `package.json`: Dependencies and scripts
- `.env`: Environment variables (not in git)
- `.env.example`: Environment template

## Next Steps

With the directory structure in place, the next tasks will populate these directories with:
1. Shared type definitions (Task 2.1)
2. Backend services and API endpoints (Tasks 3-6)
3. Frontend components and pages (Tasks 8-15)
4. Tests for all components (Throughout implementation)

## References

- See individual README.md files in each directory for specific guidance
- See `.kiro/steering/tech.md` for technology stack details
- See `.kiro/steering/structure.md` for architecture patterns
- See `.kiro/specs/event-planning-platform/design.md` for detailed design
