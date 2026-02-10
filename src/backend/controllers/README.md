# Backend Controllers

This directory contains business logic controllers that process requests.

## Controllers

- **Recommendation Controller**: Processes recommendation requests
- **Chat Controller**: Handles chat message processing
- **Validation Controller**: Request validation logic

## Naming Convention

- Use camelCase for controller files (e.g., `recommendationController.ts`)
- Co-locate tests with controllers using `.test.ts` suffix
- Controllers orchestrate services and handle business logic
- Keep controllers focused on single responsibility
