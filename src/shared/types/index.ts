/**
 * Shared TypeScript interfaces for Event Planning Platform
 * These types are used by both frontend and backend
 */

// ============================================================================
// Event Constraints Model
// ============================================================================

/**
 * Event constraints provided by the user for event planning
 * 
 * Validation Rules:
 * - startDate must be before endDate
 * - budget.min must be less than or equal to budget.max
 * - budget.min and budget.max must be positive numbers
 * - attendees must be a positive integer
 * - location must be a non-empty string
 */
export interface EventConstraints {
  timeRange: {
    startDate: Date | string;
    endDate: Date | string;
  };
  budget: {
    min: number;
    max: number;
  };
  location: string;
  attendees: number;
  foodOptions: string[];
  decorOptions: string[];
}

// ============================================================================
// Option Models
// ============================================================================

/**
 * Venue option with location, capacity, and pricing information
 * 
 * Constraints:
 * - capacity must be positive integer
 * - pricePerDay must be positive number
 * - location should match user's location preference or be nearby
 */
export interface VenueOption {
  id: string;
  name: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  amenities: string[];
  description: string;
  images?: string[];
}

/**
 * Food option with type, pricing, and dietary information
 * 
 * Constraints:
 * - pricePerPerson must be positive number
 * - minAttendees must be positive integer
 * - maxAttendees (if present) must be greater than minAttendees
 */
export interface FoodOption {
  id: string;
  name: string;
  type: string; // e.g., "buffet", "plated", "cocktail"
  pricePerPerson: number;
  minAttendees: number;
  maxAttendees?: number;
  dietaryOptions: string[]; // e.g., "vegetarian", "vegan", "gluten-free"
  description: string;
}

/**
 * Decor option with style, pricing, and description
 * 
 * Constraints:
 * - totalPrice must be positive number
 * - style should match user preferences when specified
 */
export interface DecorOption {
  id: string;
  name: string;
  style: string; // e.g., "modern", "rustic", "elegant"
  totalPrice: number;
  description: string;
  includes: string[];
  images?: string[];
}

// ============================================================================
// API Request/Response Models
// ============================================================================

/**
 * Request payload for recommendation API endpoint
 * Contains event constraints in JSON-serializable format
 */
export interface RecommendationRequest {
  timeRange: {
    startDate: string;
    endDate: string;
  };
  budget: {
    min: number;
    max: number;
  };
  location: string;
  attendees: number;
  foodOptions: string[];
  decorOptions: string[];
}

/**
 * Response payload from recommendation API endpoint
 * Contains filtered venue, food, and decor options with cost estimates
 */
export interface RecommendationResponse {
  venues: VenueOption[];
  foodOptions: FoodOption[];
  decorOptions: DecorOption[];
  totalEstimate: {
    min: number;
    max: number;
  };
  message?: string;
}

// ============================================================================
// Chat Models
// ============================================================================

/**
 * Chat message in conversation history
 * 
 * Constraints:
 * - id must be unique
 * - content must be non-empty string
 * - timestamp must be valid date
 */
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date | string;
  recommendations?: RecommendationResponse;
}

/**
 * Request payload for chat API endpoint
 * Includes message, optional context, and conversation history
 */
export interface ChatRequest {
  message: string;
  context?: RecommendationRequest;
  conversationHistory?: ChatMessage[];
}

/**
 * Response payload from chat API endpoint
 * Contains AI-generated message and optional recommendations
 */
export interface ChatResponse {
  message: string;
  recommendations?: RecommendationResponse;
}

// ============================================================================
// Validation Models
// ============================================================================

/**
 * Result of form or request validation
 * Contains validation status and error messages for invalid fields
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Map<string, string> | Record<string, string>;
}

/**
 * Standard error response format for API endpoints
 * Used for all error conditions (validation, server errors, etc.)
 */
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// ============================================================================
// Filter Models for Data Store
// ============================================================================

/**
 * Filters for querying venue options from data store
 */
export interface VenueFilters {
  location?: string;
  minCapacity?: number;
  maxPricePerDay?: number;
}

/**
 * Filters for querying food options from data store
 */
export interface FoodFilters {
  type?: string;
  maxPricePerPerson?: number;
  dietaryOptions?: string[];
}

/**
 * Filters for querying decor options from data store
 */
export interface DecorFilters {
  style?: string;
  maxTotalPrice?: number;
}

// ============================================================================
// AI Agent Models
// ============================================================================

/**
 * Analysis of event constraints by AI agent
 * Used to calculate budget breakdown and feasibility
 */
export interface ConstraintAnalysis {
  budgetPerDay: number;
  durationDays: number;
  budgetBreakdown: {
    venue: number;
    food: number;
    decor: number;
  };
  feasibilityScore: number;
}

// ============================================================================
// Data Store Interface
// ============================================================================

/**
 * Interface for data store operations
 * Manages venue, food, and decor option data
 */
export interface DataStore {
  getVenues(filters?: VenueFilters): VenueOption[];
  getFoodOptions(filters?: FoodFilters): FoodOption[];
  getDecorOptions(filters?: DecorFilters): DecorOption[];
  addVenue(venue: VenueOption): void;
  addFoodOption(food: FoodOption): void;
  addDecorOption(decor: DecorOption): void;
}
