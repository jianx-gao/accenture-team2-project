# Backend Routes

This directory contains API route definitions and endpoint handlers.

## Routes

- **Recommendation Routes**: `/api/recommendations` endpoint
- **Chat Routes**: `/api/chat` endpoint
- **Health Routes**: `/api/health` endpoint

## Naming Convention

- Use camelCase for route files (e.g., `recommendationRoutes.ts`)
- Co-locate tests with routes using `.test.ts` suffix
- Routes should delegate business logic to controllers
- Keep routes focused on HTTP handling (request/response)
