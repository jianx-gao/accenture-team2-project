# Backend Services

This directory contains core business services and logic.

## Services

- **AI Agent Service**: Agentic AI logic for processing constraints
- **Recommendation Engine**: Filters and ranks venue/food/decor options
- **Data Store Service**: Manages data access and queries

## Naming Convention

- Use camelCase for service files (e.g., `aiAgentService.ts`)
- Co-locate tests with services using `.test.ts` suffix
- Services should be reusable and testable
- Keep services focused on specific business capabilities
