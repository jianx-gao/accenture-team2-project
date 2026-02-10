# Implementation Plan: Budget Scoper

## Overview

This implementation plan breaks down the Budget Scoper feature into discrete TypeScript coding tasks. The approach follows a bottom-up strategy: starting with domain models and core business logic, then building application services, and finally implementing data persistence and export functionality. Each task includes property-based tests using fast-check to validate correctness properties from the design document.

## Tasks

- [ ] 1. Project setup and configuration
  - Initialize TypeScript project with tsconfig.json
  - Install dependencies: fast-check (for property testing), decimal.js (for precise currency calculations), uuid, date-fns
  - Set up testing framework (Jest or Vitest)
  - Configure linting (ESLint) and formatting (Prettier)
  - Create project structure: src/domain, src/application, src/data, src/presentation, tests/
  - _Requirements: All (foundational)_

- [ ] 2. Implement domain models
  - [ ] 2.1 Create core domain types and enums
    - Define EventComponent enum (VENUE, CATERING, DECOR, etc.)
    - Define BudgetStatus enum (DRAFT, ACTIVE, FINALIZED)
    - Define BookingStatus enum (PENDING, CONFIRMED, FAILED, CANCELLED)
    - Define RiskLevel enum (LOW, MEDIUM, HIGH, CRITICAL)
    - Create Currency type and common currency constants
    - _Requirements: 1.1, 2.1, 6.1, 3.2_

  - [ ] 2.2 Implement Budget model with computed properties
    - Create Budget class with id, event_id, total_amount, currency, allocations, timestamps, status
    - Implement computed properties: total_allocated, remaining, is_over_budget
    - Add validation methods for budget invariants
    - _Requirements: 1.1, 2.1, 8.1_

  - [ ]* 2.3 Write property test for Budget model
    - **Property 3: Budget invariant preservation**
    - **Validates: Requirements 1.3, 2.5**

  - [ ] 2.4 Implement Allocation model
    - Create Allocation class with id, budget_id, component, allocated_amount, actual_spent, vendor_id, notes, timestamps
    - Add validation for non-negative amounts
    - _Requirements: 2.1, 8.2_

  - [ ] 2.5 Implement PriorityApproach model
    - Create PriorityApproach class with id, name, component_ordering, is_predefined, description
    - Implement get_priority_rank() and compare_components() methods
    - Create factory methods for predefined approaches (decor-first, guest-count-first, food-first)
    - _Requirements: 2.2, 9.1, 9.2_

  - [ ]* 2.6 Write property test for PriorityApproach
    - **Property 26: Custom priority approach creation**
    - **Validates: Requirements 9.1, 9.4**

  - [ ] 2.7 Implement recommendation models
    - Create AllocationRecommendation class with recommended_allocations, rationale, confidence_score
    - Create RecommendedAllocation class with component, amount, percentage, benchmark_comparison, rationale
    - Create ScaleBackSuggestion class with target_reduction, affected_components, total_savings, impact_description, stakeholder_message
    - Create ComponentAdjustment class with current_amount, proposed_amount, reduction details
    - _Requirements: 1.1, 1.4, 1.5, 2.1, 4.1_

  - [ ] 2.8 Implement forecast models
    - Create Forecast class with predicted_total, confidence intervals, risk_components, generated_at
    - Create RiskAssessment class with component, predictions, overrun_probability, risk_level, mitigation_suggestions
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ]* 2.9 Write property test for Forecast model
    - **Property 9: Confidence interval validity**
    - **Validates: Requirements 3.4**

  - [ ] 2.10 Implement vendor and booking models
    - Create Vendor class with id, name, component_types, pricing_tiers, contact_info, availability, rating
    - Create BookingRequest class with vendor_id, budget_id, component, status, timestamps
    - Create BudgetSnapshot class for history tracking
    - _Requirements: 6.1, 6.2, 7.1, 8.5_

- [ ] 3. Checkpoint - Ensure domain models compile and basic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement BudgetManager (core orchestration)
  - [ ] 4.1 Create BudgetManager class with budget state management
    - Implement create_budget() method
    - Implement update_allocation() with validation
    - Implement get_current_state() for state queries
    - Implement apply_scale_back() to apply suggestions
    - Implement get_budget_history() for history retrieval
    - _Requirements: 1.3, 2.1, 2.4, 2.5, 8.1, 8.5_

  - [ ]* 4.2 Write property test for allocation updates
    - **Property 23: Budget state consistency**
    - **Validates: Requirements 8.1, 8.2**

  - [ ]* 4.3 Write property test for custom allocations
    - **Property 7: Custom allocation acceptance**
    - **Validates: Requirements 2.4**

  - [ ]* 4.4 Write property test for budget history
    - **Property 25: Budget change history**
    - **Validates: Requirements 8.5**

- [ ] 5. Implement RecommendationEngine
  - [ ] 5.1 Create RecommendationEngine class with allocation logic
    - Implement generate_allocation() using priority approach and industry benchmarks
    - Create benchmark data structure for different event types
    - Implement allocation distribution algorithm
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 5.2 Write property test for allocation generation
    - **Property 6: Allocation recommendation generation**
    - **Validates: Requirements 2.1**

  - [ ] 5.3 Implement scale-back generation logic
    - Implement generate_scale_backs() with iterative reduction algorithm
    - Create multiple scale-back options with different trade-off profiles
    - Ensure priority approach is respected in cuts
    - _Requirements: 1.1, 1.2, 1.4_

  - [ ]* 5.4 Write property test for scale-back generation
    - **Property 1: Scale-back generation for over-budget scenarios**
    - **Validates: Requirements 1.1**

  - [ ]* 5.5 Write property test for priority respect in scale-backs
    - **Property 2: Priority approach respected in scale-backs**
    - **Validates: Requirements 1.2**

  - [ ]* 5.6 Write property test for multiple scale-back options
    - **Property 4: Multiple scale-back options**
    - **Validates: Requirements 1.4**

  - [ ]* 5.7 Write property test for scale-back impact completeness
    - **Property 5: Scale-back impact completeness**
    - **Validates: Requirements 1.5**

  - [ ] 5.8 Implement recommendation explanation generation
    - Implement explain_recommendation() to generate rationales
    - Create stakeholder communication templates
    - Include benefits and drawbacks for each option
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ]* 5.9 Write property test for recommendation completeness
    - **Property 11: Recommendation completeness**
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ]* 5.10 Write property test for priority approach consistency
    - **Property 27: Priority approach consistency**
    - **Validates: Requirements 9.3**

  - [ ]* 5.11 Write property test for priority approach explanation
    - **Property 28: Priority approach explanation**
    - **Validates: Requirements 9.5**

  - [ ] 5.12 Implement compare_approaches() for approach comparison
    - Generate allocations for multiple approaches
    - Create comparison report showing differences
    - _Requirements: 9.5_

- [ ] 6. Checkpoint - Ensure recommendation engine works correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement ForecastEngine
  - [ ] 7.1 Create ForecastEngine class with forecast generation
    - Implement generate_forecast() using historical data analysis
    - Calculate predicted costs based on historical variance
    - Compute confidence intervals
    - _Requirements: 3.1, 3.3, 3.4_

  - [ ]* 7.2 Write property test for forecast generation
    - **Property 8: Forecast generation for allocated budgets**
    - **Validates: Requirements 3.1, 3.2**

  - [ ] 7.3 Implement risk identification logic
    - Implement identify_risk_components() to score overrun risk
    - Calculate risk levels based on historical overrun frequency
    - Generate mitigation suggestions
    - _Requirements: 3.2_

  - [ ] 7.4 Implement forecast updates
    - Implement update_forecast() to recalculate when actual costs change
    - Ensure real-time responsiveness
    - _Requirements: 3.5_

  - [ ]* 7.5 Write property test for forecast recalculation
    - **Property 10: Forecast recalculation on updates**
    - **Validates: Requirements 3.5**

  - [ ] 7.6 Implement get_confidence_interval() for component-specific intervals
    - Calculate per-component confidence intervals
    - _Requirements: 3.4_

- [ ] 8. Implement bundle functionality
  - [ ] 8.1 Create Bundle model and BundleManager
    - Define Bundle class with vendors, services, total_cost, discount
    - Implement create_bundle() method
    - Implement calculate_bundle_cost() with discount logic
    - _Requirements: 5.1, 5.2_

  - [ ]* 8.2 Write property test for bundle cost calculation
    - **Property 12: Bundle creation and cost calculation**
    - **Validates: Requirements 5.1, 5.2**

  - [ ] 8.3 Implement bundle suggestion generation
    - Implement suggest_bundles() based on common vendor combinations
    - Use heuristics for likely bundle candidates
    - _Requirements: 5.3_

  - [ ]* 8.4 Write property test for bundle suggestions
    - **Property 13: Bundle suggestion generation**
    - **Validates: Requirements 5.3**

  - [ ] 8.5 Implement bundle application to budget
    - Integrate bundles as single allocation line items
    - Support expansion to show component details
    - _Requirements: 5.4_

  - [ ]* 8.6 Write property test for bundle representation
    - **Property 14: Bundle representation as single line item**
    - **Validates: Requirements 5.4**

  - [ ] 8.7 Implement bundle cost comparison
    - Implement compare_bundle_costs() to show bundled vs unbundled
    - _Requirements: 5.5_

  - [ ]* 8.8 Write property test for bundle cost comparison
    - **Property 15: Bundle cost comparison**
    - **Validates: Requirements 5.5**

- [ ] 9. Implement BookingCoordinator
  - [ ] 9.1 Create BookingCoordinator class with workflow management
    - Implement initiate_booking() to create booking requests
    - Implement track_booking_status() for status queries
    - _Requirements: 6.1, 6.2_

  - [ ]* 9.2 Write property test for booking workflow initiation
    - **Property 16: Booking workflow initiation**
    - **Validates: Requirements 6.1**

  - [ ]* 9.3 Write property test for booking status tracking
    - **Property 17: Booking status tracking**
    - **Validates: Requirements 6.2**

  - [ ] 9.4 Implement booking failure handling
    - Implement handle_booking_failure() to generate alternatives
    - Query VendorRegistry for alternative vendors
    - _Requirements: 6.3_

  - [ ]* 9.5 Write property test for booking failure handling
    - **Property 18: Booking failure handling**
    - **Validates: Requirements 6.3**

  - [ ] 9.6 Implement booking confirmation and cancellation
    - Implement confirm_booking() to finalize bookings
    - Implement cancel_booking() for cancellations
    - Ensure all transitions are recorded in history
    - _Requirements: 6.4_

  - [ ]* 9.7 Write property test for booking history completeness
    - **Property 19: Booking history completeness**
    - **Validates: Requirements 6.4**

- [ ] 10. Implement VendorRegistry
  - [ ] 10.1 Create VendorRegistry class with search and filtering
    - Implement search_vendors() with multiple filter criteria
    - Support filtering by component_type, budget_range, availability
    - _Requirements: 7.1, 7.2_

  - [ ]* 10.2 Write property test for vendor search filtering
    - **Property 20: Vendor search filtering**
    - **Validates: Requirements 7.2**

  - [ ] 10.3 Implement vendor details and management
    - Implement get_vendor_details() for full vendor profiles
    - Implement add_vendor() and update_vendor_pricing()
    - _Requirements: 7.3_

  - [ ] 10.4 Implement vendor-component association
    - Ensure vendor selection creates allocation associations
    - _Requirements: 7.4_

  - [ ]* 10.5 Write property test for vendor-component association
    - **Property 21: Vendor-component association**
    - **Validates: Requirements 7.4**

  - [ ] 10.6 Implement vendor comparison
    - Implement compare_vendors() to generate side-by-side comparison
    - Include pricing, services, ratings in comparison matrix
    - _Requirements: 7.5_

  - [ ]* 10.7 Write property test for vendor comparison generation
    - **Property 22: Vendor comparison generation**
    - **Validates: Requirements 7.5**

- [ ] 11. Checkpoint - Ensure all application services work together
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement real-time budget tracking features
  - [ ] 12.1 Add budget state display logic
    - Implement methods to compute and display total_allocated, spent, remaining
    - Ensure immediate updates on allocation changes
    - _Requirements: 8.1, 8.2_

  - [ ] 12.2 Implement visual indicators for budget health
    - Create budget health status calculation (healthy, warning, critical)
    - Generate color codes and progress bar data
    - _Requirements: 8.3_

  - [ ] 12.3 Implement over-budget warning system
    - Detect over-budget conditions
    - Generate prominent warning messages
    - _Requirements: 8.4_

  - [ ]* 12.4 Write property test for over-budget warning generation
    - **Property 24: Over-budget warning generation**
    - **Validates: Requirements 8.4**

- [ ] 13. Implement PriorityApproachManager
  - [ ] 13.1 Create PriorityApproachManager class
    - Implement get_predefined_approaches() to return built-in approaches
    - Implement create_custom_approach() with validation
    - _Requirements: 9.1, 9.2, 9.4_

  - [ ] 13.2 Implement approach application and impact analysis
    - Implement apply_approach() to generate allocation plans
    - Implement explain_approach_impact() to show how approach affects budget
    - _Requirements: 9.3, 9.5_

- [ ] 14. Implement data persistence layer
  - [ ] 14.1 Create repository interfaces
    - Define IBudgetRepository interface with CRUD operations
    - Define IVendorRepository interface
    - Define IHistoryStore interface for snapshots
    - _Requirements: 10.1_

  - [ ] 14.2 Implement in-memory repositories for testing
    - Create InMemoryBudgetRepository
    - Create InMemoryVendorRepository
    - Create InMemoryHistoryStore
    - _Requirements: 10.1_

  - [ ]* 14.3 Write property test for data persistence and retrieval
    - **Property 29: Data persistence and retrieval**
    - **Validates: Requirements 10.1, 10.5**

  - [ ] 14.4 Implement automatic save on modifications
    - Add event listeners for budget changes
    - Trigger repository saves automatically
    - _Requirements: 10.5_

- [ ] 15. Implement ExportManager
  - [ ] 15.1 Create ExportManager class with format handlers
    - Implement export_to_csv() to generate CSV files
    - Implement export_to_excel() to generate Excel workbooks
    - Implement export_to_pdf() to generate PDF documents
    - Include all components, allocations, forecasts, recommendations in exports
    - _Requirements: 10.2, 10.3_

  - [ ]* 15.2 Write property test for export format support
    - **Property 30: Export format support**
    - **Validates: Requirements 10.2, 10.3**

  - [ ] 15.3 Implement import functionality
    - Implement import_from_csv() to parse CSV data
    - Implement import_from_excel() to parse Excel data
    - Validate imported data and create Budget objects
    - _Requirements: 10.4_

  - [ ]* 15.4 Write property test for import data acceptance
    - **Property 31: Import data acceptance**
    - **Validates: Requirements 10.4**

  - [ ]* 15.5 Write property test for export-import round trip
    - **Property 32: Export-import round trip**
    - **Validates: Requirements 10.2, 10.4**

- [ ] 16. Implement error handling and validation
  - [ ] 16.1 Create error classes and error response structure
    - Define ErrorResponse class with error_code, message, details, suggested_actions
    - Create specific error classes: ValidationError, PersistenceError, BookingError, etc.
    - _Requirements: All (cross-cutting)_

  - [ ] 16.2 Add input validation throughout the system
    - Validate budget amounts (non-negative, non-zero)
    - Validate allocations (non-negative)
    - Validate priority approaches (no duplicates, all components)
    - _Requirements: 1.3, 2.4, 2.5, 9.1_

  - [ ] 16.3 Implement error handling for external system failures
    - Add retry logic with exponential backoff for vendor API calls
    - Implement fallback to manual booking on failures
    - Add error logging and admin notifications
    - _Requirements: 6.3_

  - [ ] 16.4 Implement business logic error handling
    - Handle impossible scale-back scenarios (notify user of budget increase need)
    - Handle insufficient historical data (use wider confidence intervals)
    - Handle booking conflicts (suggest alternatives)
    - _Requirements: 1.1, 3.3, 6.3_

- [ ] 17. Integration testing and end-to-end workflows
  - [ ]* 17.1 Write integration test for complete budget workflow
    - Test: create budget → generate allocations → apply → forecast → detect over-budget → scale-back → verify within quota
    - _Requirements: 1.1, 2.1, 3.1, 8.1_

  - [ ]* 17.2 Write integration test for booking workflow
    - Test: create budget → select vendor → approve → verify booking request → simulate confirmation → verify status
    - _Requirements: 6.1, 6.2, 7.4_

  - [ ]* 17.3 Write integration test for export-import workflow
    - Test: create complex budget → export CSV → import → verify data preserved → repeat for Excel
    - _Requirements: 10.2, 10.4_

- [ ] 18. Final checkpoint - Ensure all tests pass and system is complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check library with minimum 100 iterations per test
- All currency calculations use decimal.js to avoid floating-point precision issues
- The implementation follows a layered architecture: domain → application → data → presentation
- Error handling is implemented as a cross-cutting concern throughout all layers
- Integration tests verify end-to-end workflows across multiple components
