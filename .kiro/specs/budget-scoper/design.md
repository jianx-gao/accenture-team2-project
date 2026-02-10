# Design Document: Budget Scoper

## Overview

The Budget Scoper is an intelligent budget management system that provides event planners with data-driven recommendations for allocation, scale-back suggestions, forecasting, and stakeholder communication. The system operates as a decision support tool that combines rule-based logic with historical data analysis to optimize budget management across diverse event types.

The core design philosophy emphasizes:
- **Transparency**: All recommendations include clear rationales
- **Flexibility**: Support for multiple priority approaches and custom configurations
- **Real-time responsiveness**: Immediate feedback on budget changes
- **Actionability**: Recommendations that can be directly applied to budgets

## Architecture

The system follows a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│  (UI Components, Export Formatters, Visualizations)     │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  (Budget Manager, Recommendation Engine, Booking        │
│   Coordinator, Forecast Engine)                         │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                    Domain Layer                          │
│  (Budget, Event, Vendor, Allocation, Priority Approach) │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                 Data Access Layer                        │
│  (Budget Repository, Vendor Repository, History Store)  │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Recommendation Engine as Core Component**: The recommendation engine is the heart of the system, consuming budget state and priority approaches to generate suggestions.

2. **Event-Driven Updates**: Budget changes trigger events that cascade through the system, updating forecasts, recommendations, and UI state.

3. **Pluggable Priority Strategies**: Priority approaches are implemented as strategy objects, allowing easy addition of new allocation algorithms.

4. **Separation of Calculation and Persistence**: Budget calculations are pure functions that don't directly modify state, making them testable and predictable.

## Components and Interfaces

### 1. Budget Manager

**Responsibility**: Orchestrates all budget operations and maintains budget state.

**Interface**:
```
class BudgetManager:
    create_budget(event_id, total_amount, currency) -> Budget
    update_allocation(budget_id, component_id, amount) -> Budget
    get_current_state(budget_id) -> BudgetState
    apply_scale_back(budget_id, suggestion_id) -> Budget
    get_budget_history(budget_id) -> List[BudgetSnapshot]
```

**Key Operations**:
- Budget creation and initialization
- Allocation updates with validation
- Scale-back application
- State queries and history retrieval

### 2. Recommendation Engine

**Responsibility**: Generates allocation recommendations and scale-back suggestions based on priority approaches and constraints.

**Interface**:
```
class RecommendationEngine:
    generate_allocation(budget, priority_approach, event_type) -> AllocationRecommendation
    generate_scale_backs(budget, priority_approach, target_amount) -> List[ScaleBackSuggestion]
    explain_recommendation(recommendation_id) -> Explanation
    compare_approaches(budget, approaches) -> ComparisonReport
```

**Key Algorithms**:
- **Priority-Based Allocation**: Distributes budget according to priority ordering and industry benchmarks
- **Iterative Scale-Back**: Progressively reduces allocations starting from lowest priority components
- **Multi-Option Generation**: Creates multiple scale-back scenarios with different trade-off profiles

### 3. Forecast Engine

**Responsibility**: Predicts future costs and identifies overrun risks.

**Interface**:
```
class ForecastEngine:
    generate_forecast(budget, historical_data) -> Forecast
    identify_risk_components(forecast) -> List[RiskAssessment]
    update_forecast(budget, actual_costs) -> Forecast
    get_confidence_interval(forecast, component_id) -> ConfidenceInterval
```

**Key Algorithms**:
- **Historical Analysis**: Compares current allocations against similar past events
- **Variance Calculation**: Computes expected variance based on component type and event characteristics
- **Risk Scoring**: Assigns risk levels based on historical overrun frequency

### 4. Booking Coordinator

**Responsibility**: Manages automated booking workflows and vendor interactions.

**Interface**:
```
class BookingCoordinator:
    initiate_booking(vendor_id, component_id, budget_id) -> BookingRequest
    track_booking_status(booking_id) -> BookingStatus
    handle_booking_failure(booking_id, reason) -> List[Alternative]
    confirm_booking(booking_id) -> BookingConfirmation
    cancel_booking(booking_id) -> CancellationResult
```

**Workflow**:
1. Receive booking request from approved allocation
2. Generate vendor-specific booking payload
3. Submit to vendor API or queue for manual processing
4. Poll for status updates
5. Handle confirmations or failures

### 5. Vendor Registry

**Responsibility**: Maintains vendor database and provides search/filtering capabilities.

**Interface**:
```
class VendorRegistry:
    search_vendors(component_type, budget_range, availability) -> List[Vendor]
    get_vendor_details(vendor_id) -> VendorProfile
    compare_vendors(vendor_ids) -> ComparisonMatrix
    add_vendor(vendor_data) -> Vendor
    update_vendor_pricing(vendor_id, pricing_data) -> Vendor
```

**Search Capabilities**:
- Filter by component type (venue, catering, decor, etc.)
- Budget range filtering
- Availability checking
- Rating and review integration

### 6. Priority Approach Manager

**Responsibility**: Manages priority approach configurations and applies them to recommendations.

**Interface**:
```
class PriorityApproachManager:
    get_predefined_approaches() -> List[PriorityApproach]
    create_custom_approach(name, component_ordering) -> PriorityApproach
    apply_approach(budget, approach) -> AllocationPlan
    explain_approach_impact(approach, budget) -> ImpactAnalysis
```

**Predefined Approaches**:
- **Decor-First**: Prioritizes aesthetic elements, then food, then guest count
- **Guest-Count-First**: Prioritizes attendance capacity, then decor, then food
- **Food-First**: Prioritizes catering quality, then decor, then guest count

### 7. Export Manager

**Responsibility**: Handles data export and import operations.

**Interface**:
```
class ExportManager:
    export_to_pdf(budget_id, include_forecasts) -> PDFDocument
    export_to_csv(budget_id) -> CSVFile
    export_to_excel(budget_id, include_charts) -> ExcelWorkbook
    import_from_csv(file_data) -> Budget
    import_from_excel(file_data) -> Budget
```

## Data Models

### Budget

```
class Budget:
    id: UUID
    event_id: UUID
    total_amount: Decimal
    currency: String
    allocations: List[Allocation]
    created_at: DateTime
    updated_at: DateTime
    status: BudgetStatus (DRAFT, ACTIVE, FINALIZED)
    
    computed properties:
        total_allocated: Decimal
        remaining: Decimal
        is_over_budget: Boolean
```

### Allocation

```
class Allocation:
    id: UUID
    budget_id: UUID
    component: EventComponent
    allocated_amount: Decimal
    actual_spent: Decimal
    vendor_id: Optional[UUID]
    notes: String
    created_at: DateTime
    updated_at: DateTime
```

### EventComponent

```
enum EventComponent:
    VENUE
    CATERING
    DECOR
    ENTERTAINMENT
    PHOTOGRAPHY
    TRANSPORTATION
    GUEST_ACCOMMODATION
    MARKETING
    STAFFING
    CONTINGENCY
```

### PriorityApproach

```
class PriorityApproach:
    id: UUID
    name: String
    component_ordering: List[EventComponent]
    is_predefined: Boolean
    description: String
    
    methods:
        get_priority_rank(component: EventComponent) -> Integer
        compare_components(comp1, comp2) -> Integer
```

### AllocationRecommendation

```
class AllocationRecommendation:
    id: UUID
    budget_id: UUID
    approach_used: PriorityApproach
    recommended_allocations: List[RecommendedAllocation]
    rationale: String
    confidence_score: Float
    created_at: DateTime
```

### RecommendedAllocation

```
class RecommendedAllocation:
    component: EventComponent
    amount: Decimal
    percentage: Float
    benchmark_comparison: String
    rationale: String
```

### ScaleBackSuggestion

```
class ScaleBackSuggestion:
    id: UUID
    budget_id: UUID
    target_reduction: Decimal
    affected_components: List[ComponentAdjustment]
    total_savings: Decimal
    impact_description: String
    stakeholder_message: String
    priority_rank: Integer
```

### ComponentAdjustment

```
class ComponentAdjustment:
    component: EventComponent
    current_amount: Decimal
    proposed_amount: Decimal
    reduction_amount: Decimal
    reduction_percentage: Float
    impact_notes: String
```

### Forecast

```
class Forecast:
    id: UUID
    budget_id: UUID
    predicted_total: Decimal
    confidence_interval_low: Decimal
    confidence_interval_high: Decimal
    risk_components: List[RiskAssessment]
    generated_at: DateTime
    based_on_events: List[UUID]
```

### RiskAssessment

```
class RiskAssessment:
    component: EventComponent
    current_allocation: Decimal
    predicted_actual: Decimal
    overrun_probability: Float
    risk_level: RiskLevel (LOW, MEDIUM, HIGH, CRITICAL)
    mitigation_suggestions: List[String]
```

### Vendor

```
class Vendor:
    id: UUID
    name: String
    component_types: List[EventComponent]
    pricing_tiers: List[PricingTier]
    contact_info: ContactInfo
    availability_calendar: AvailabilityCalendar
    rating: Float
    reviews_count: Integer
    booking_api_endpoint: Optional[String]
```

### BookingRequest

```
class BookingRequest:
    id: UUID
    vendor_id: UUID
    budget_id: UUID
    component: EventComponent
    requested_amount: Decimal
    event_date: Date
    status: BookingStatus (PENDING, CONFIRMED, FAILED, CANCELLED)
    created_at: DateTime
    confirmed_at: Optional[DateTime]
    failure_reason: Optional[String]
```

### BudgetSnapshot

```
class BudgetSnapshot:
    id: UUID
    budget_id: UUID
    snapshot_time: DateTime
    total_allocated: Decimal
    allocations: List[Allocation]
    change_description: String
    changed_by: UUID
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Scale-back generation for over-budget scenarios
*For any* budget where total allocated exceeds the quota, the system should generate at least one scale-back suggestion that would bring the budget within quota.
**Validates: Requirements 1.1**

### Property 2: Priority approach respected in scale-backs
*For any* budget and priority approach, when generating scale-back suggestions, the components with lower priority (later in the ordering) should receive larger cuts than higher priority components.
**Validates: Requirements 1.2**

### Property 3: Budget invariant preservation
*For any* budget operation (allocation update, scale-back application, component modification), the sum of all component allocations should equal the total allocated budget, and applying a scale-back suggestion should result in a total that meets the budget quota.
**Validates: Requirements 1.3, 2.5**

### Property 4: Multiple scale-back options
*For any* over-budget scenario, the system should generate at least two distinct scale-back suggestions with different trade-off profiles.
**Validates: Requirements 1.4**

### Property 5: Scale-back impact completeness
*For any* scale-back suggestion, impact information (current amount, proposed amount, reduction) should be present for all affected event components.
**Validates: Requirements 1.5**

### Property 6: Allocation recommendation generation
*For any* valid total budget amount and event type, the system should generate allocation recommendations that sum to the total budget.
**Validates: Requirements 2.1**

### Property 7: Custom allocation acceptance
*For any* set of component allocations where the sum equals the total budget and all amounts are non-negative, the system should accept the custom allocation.
**Validates: Requirements 2.4**

### Property 8: Forecast generation for allocated budgets
*For any* budget with at least one component allocation, the system should generate a forecast with predicted costs and risk assessments.
**Validates: Requirements 3.1, 3.2**

### Property 9: Confidence interval validity
*For any* forecast, the confidence interval should satisfy: confidence_low <= predicted_total <= confidence_high, and all values should be non-negative.
**Validates: Requirements 3.4**

### Property 10: Forecast recalculation on updates
*For any* budget, updating actual costs for any component should trigger a forecast recalculation that reflects the new data.
**Validates: Requirements 3.5**

### Property 11: Recommendation completeness
*For any* recommendation (allocation or scale-back), the system should provide a rationale explanation, and for scale-backs, should include stakeholder communication templates with benefits and drawbacks.
**Validates: Requirements 4.1, 4.2, 4.3**

### Property 12: Bundle creation and cost calculation
*For any* valid set of vendors or services, the system should allow bundle creation, and the bundle's total cost should equal the sum of component costs (or sum minus discount if applicable).
**Validates: Requirements 5.1, 5.2**

### Property 13: Bundle suggestion generation
*For any* budget state with multiple unallocated components, the system should be able to generate bundle suggestions based on vendor combinations.
**Validates: Requirements 5.3**

### Property 14: Bundle representation as single line item
*For any* bundle applied to a budget, it should appear as a single allocation entry that can be expanded to show component details.
**Validates: Requirements 5.4**

### Property 15: Bundle cost comparison
*For any* bundle, the system should provide both bundled total cost and unbundled total cost for comparison.
**Validates: Requirements 5.5**

### Property 16: Booking workflow initiation
*For any* budget allocation approval with a selected vendor, the system should create a booking request with status PENDING.
**Validates: Requirements 6.1**

### Property 17: Booking status tracking
*For any* booking request, the system should maintain and provide queryable status information (PENDING, CONFIRMED, FAILED, CANCELLED).
**Validates: Requirements 6.2**

### Property 18: Booking failure handling
*For any* booking request that transitions to FAILED status, the system should generate alternative vendor suggestions for the same component.
**Validates: Requirements 6.3**

### Property 19: Booking history completeness
*For any* booking request, all status transitions (confirmations, cancellations, failures) should be recorded with timestamps in the booking history.
**Validates: Requirements 6.4**

### Property 20: Vendor search filtering
*For any* vendor search with budget range, availability, and event type filters, all returned vendors should match all specified criteria.
**Validates: Requirements 7.2**

### Property 21: Vendor-component association
*For any* vendor selection for a component, the system should create an allocation linking the vendor to that specific event component.
**Validates: Requirements 7.4**

### Property 22: Vendor comparison generation
*For any* set of two or more vendors, the system should generate a comparison view showing pricing, services, and ratings side-by-side.
**Validates: Requirements 7.5**

### Property 23: Budget state consistency
*For any* budget, the displayed values for total allocated, spent, and remaining should satisfy: remaining = total_budget - total_allocated, and these values should update immediately when any component allocation changes.
**Validates: Requirements 8.1, 8.2**

### Property 24: Over-budget warning generation
*For any* budget state where total allocated exceeds the quota, the system should generate and display a warning indicator.
**Validates: Requirements 8.4**

### Property 25: Budget change history
*For any* budget modification (allocation update, vendor selection, scale-back application), a history record should be created with timestamp and change description.
**Validates: Requirements 8.5**

### Property 26: Custom priority approach creation
*For any* valid ordering of event components (no duplicates, all components included), the system should accept it as a custom priority approach.
**Validates: Requirements 9.1, 9.4**

### Property 27: Priority approach consistency
*For any* budget and selected priority approach, all recommendations (allocations and scale-backs) generated for that budget should use the same priority approach.
**Validates: Requirements 9.3**

### Property 28: Priority approach explanation
*For any* recommendation, the explanation should reference the priority approach used and describe how it influenced the allocation or scale-back decisions.
**Validates: Requirements 9.5**

### Property 29: Data persistence and retrieval
*For any* budget, allocation, or recommendation created in the system, it should be persistable and retrievable with all fields intact, and modifications should be automatically saved.
**Validates: Requirements 10.1, 10.5**

### Property 30: Export format support
*For any* budget, the system should be able to export it to PDF, CSV, and Excel formats, each containing all components, allocations, forecasts, and recommendations.
**Validates: Requirements 10.2, 10.3**

### Property 31: Import data acceptance
*For any* valid budget data in supported external formats (CSV, Excel), the system should be able to import it and create a corresponding budget object.
**Validates: Requirements 10.4**

### Property 32: Export-import round trip
*For any* budget, exporting to CSV or Excel and then importing should produce an equivalent budget with the same allocations and component data.
**Validates: Requirements 10.2, 10.4**

## Error Handling

The system must handle various error conditions gracefully:

### Input Validation Errors

**Invalid Budget Amounts**:
- Negative or zero budget amounts → Reject with clear error message
- Non-numeric values → Reject with type error
- Currency mismatches → Reject or offer conversion

**Invalid Allocations**:
- Negative allocation amounts → Reject with validation error
- Allocations exceeding total budget → Accept but trigger over-budget warnings
- Missing required fields → Reject with field-specific errors

**Invalid Priority Approaches**:
- Duplicate components in ordering → Reject with error
- Missing components → Reject with error
- Unknown component types → Reject with error

### External System Errors

**Vendor API Failures**:
- Timeout → Retry with exponential backoff, fallback to manual booking
- Authentication failure → Log error, notify admin, queue for manual processing
- Invalid response → Log error, mark booking as failed, suggest alternatives

**Data Persistence Failures**:
- Database connection loss → Queue operations in memory, retry on reconnection
- Write failures → Rollback transaction, notify user, preserve in-memory state
- Corruption detection → Restore from last known good snapshot

### Business Logic Errors

**Impossible Scale-Back Scenarios**:
- Cannot meet quota even with all components at minimum → Notify user that budget increase is required
- No components available to cut → Suggest budget increase or scope reduction

**Forecast Generation Failures**:
- Insufficient historical data → Generate forecast with wider confidence intervals, mark as low-confidence
- No similar events found → Use generic industry benchmarks, mark as estimated

**Booking Conflicts**:
- Vendor unavailable for date → Suggest alternative dates or vendors
- Budget insufficient for vendor → Suggest budget reallocation or alternative vendors

### Error Response Format

All errors should follow a consistent structure:

```
class ErrorResponse:
    error_code: String
    message: String
    details: Dict[String, Any]
    suggested_actions: List[String]
    timestamp: DateTime
```

## Testing Strategy

The Budget Scoper requires comprehensive testing across multiple dimensions to ensure correctness, reliability, and usability.

### Unit Testing

Unit tests focus on individual components and specific scenarios:

**Budget Manager Tests**:
- Budget creation with valid inputs
- Allocation updates with boundary values (zero, maximum)
- State queries return correct computed values
- History tracking captures all changes

**Recommendation Engine Tests**:
- Allocation generation for specific event types (wedding, concert, corporate)
- Scale-back generation for specific over-budget scenarios
- Edge cases: single component budgets, equal priority components
- Explanation generation includes all required elements

**Forecast Engine Tests**:
- Forecast generation with minimal historical data
- Risk identification for high-variance components
- Confidence interval calculation accuracy
- Edge case: no historical data available

**Booking Coordinator Tests**:
- Booking request creation with all required fields
- Status transition handling (pending → confirmed, pending → failed)
- Failure recovery and alternative suggestion
- Cancellation workflow

**Vendor Registry Tests**:
- Search with single filter criterion
- Search with multiple combined filters
- Empty result handling
- Vendor comparison with different vendor counts

**Export Manager Tests**:
- PDF export includes all sections
- CSV export format correctness
- Excel export with charts
- Import from each supported format

### Property-Based Testing

Property-based tests verify universal correctness properties across randomized inputs. Each test should run a minimum of 100 iterations.

**Configuration**: Use a property-based testing library appropriate for the implementation language:
- Python: Hypothesis
- TypeScript/JavaScript: fast-check
- Java: jqwik
- Other languages: Select appropriate PBT library

**Test Tagging**: Each property test must include a comment tag referencing the design property:
```
# Feature: budget-scoper, Property 1: Scale-back generation for over-budget scenarios
```

**Property Test Suite**:

1. **Property 1 Test**: Generate random over-budget scenarios, verify scale-back suggestions are produced
2. **Property 2 Test**: Generate random budgets and priority approaches, verify scale-backs respect priority ordering
3. **Property 3 Test**: Generate random budget operations, verify allocation sums always equal total budget
4. **Property 4 Test**: Generate random over-budget scenarios, verify at least 2 distinct suggestions produced
5. **Property 5 Test**: Generate random scale-back suggestions, verify all affected components have impact data
6. **Property 6 Test**: Generate random budget amounts and event types, verify recommendations sum to total
7. **Property 7 Test**: Generate random valid allocation sets, verify system accepts them
8. **Property 8 Test**: Generate random budgets with allocations, verify forecasts are produced
9. **Property 9 Test**: Generate random forecasts, verify confidence interval ordering (low <= predicted <= high)
10. **Property 10 Test**: Generate random budgets, update costs, verify forecast recalculation occurs
11. **Property 11 Test**: Generate random recommendations, verify rationale and templates present
12. **Property 12 Test**: Generate random vendor sets, create bundles, verify cost calculation
13. **Property 13 Test**: Generate random budget states, verify bundle suggestions can be generated
14. **Property 14 Test**: Generate random bundles, apply to budget, verify single line item representation
15. **Property 15 Test**: Generate random bundles, verify both bundled and unbundled costs available
16. **Property 16 Test**: Generate random allocation approvals, verify booking requests created
17. **Property 17 Test**: Generate random booking requests, verify status is queryable
18. **Property 18 Test**: Generate random booking failures, verify alternatives suggested
19. **Property 19 Test**: Generate random booking state transitions, verify all recorded in history
20. **Property 20 Test**: Generate random search criteria, verify all results match filters
21. **Property 21 Test**: Generate random vendor selections, verify allocation associations created
22. **Property 22 Test**: Generate random vendor sets, verify comparison views generated
23. **Property 23 Test**: Generate random budget modifications, verify state values remain consistent
24. **Property 24 Test**: Generate random over-budget states, verify warnings present
25. **Property 25 Test**: Generate random budget modifications, verify history records created
26. **Property 26 Test**: Generate random component orderings, verify custom approaches accepted
27. **Property 27 Test**: Generate random budgets with priority approaches, verify consistency across recommendations
28. **Property 28 Test**: Generate random recommendations, verify explanations reference priority approach
29. **Property 29 Test**: Generate random budget data, persist and retrieve, verify data integrity
30. **Property 30 Test**: Generate random budgets, export to each format, verify completeness
31. **Property 31 Test**: Generate random valid external data, verify import succeeds
32. **Property 32 Test**: Generate random budgets, export then import, verify equivalence (round-trip property)

### Integration Testing

Integration tests verify component interactions:

**End-to-End Budget Workflow**:
1. Create budget
2. Generate allocation recommendations
3. Apply allocations
4. Generate forecast
5. Detect over-budget condition
6. Generate scale-backs
7. Apply scale-back
8. Verify budget within quota

**Booking Workflow Integration**:
1. Create budget with vendor selection
2. Approve allocation
3. Verify booking request created
4. Simulate vendor confirmation
5. Verify booking status updated
6. Verify budget reflects confirmed booking

**Export-Import Workflow**:
1. Create complex budget with multiple allocations
2. Export to CSV
3. Import from CSV
4. Verify all data preserved
5. Repeat for Excel format

### Performance Testing

**Load Testing**:
- Budget operations with 100+ components
- Forecast generation with 1000+ historical events
- Vendor search with 10,000+ vendors
- Concurrent budget modifications

**Response Time Requirements**:
- Budget state calculations: < 100ms
- Allocation recommendations: < 500ms
- Forecast generation: < 2s
- Scale-back suggestions: < 1s
- Export operations: < 5s

### User Acceptance Testing

While not automated, UAT should verify:
- Recommendation quality and relevance
- Explanation clarity and usefulness
- UI responsiveness and feedback
- Export format readability
- Stakeholder communication template effectiveness

### Test Data Generation

**Generators Required**:
- Random budgets with valid amounts and currencies
- Random event types and component sets
- Random priority approaches (valid orderings)
- Random vendor profiles with pricing
- Random historical event data for forecasting
- Random allocation sets (both valid and over-budget)

**Edge Cases to Include**:
- Minimum budget (e.g., $100)
- Maximum budget (e.g., $10,000,000)
- Single component budgets
- All components equal priority
- Empty vendor registry
- No historical data
- All vendors unavailable
