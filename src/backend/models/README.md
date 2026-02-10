# Backend Models

This directory contains data models and database interaction logic.

## Models

- **Venue Model**: Venue data structure and queries
- **Food Model**: Food option data structure and queries
- **Decor Model**: Decor option data structure and queries

## Naming Convention

- Use camelCase for model files (e.g., `venueModel.ts`)
- Co-locate tests with models using `.test.ts` suffix
- Models handle data persistence and retrieval
- Use shared types from `src/shared/types` for interfaces

## Note

For TypeScript interfaces, use `src/shared/types` directory to ensure type consistency between frontend and backend.
