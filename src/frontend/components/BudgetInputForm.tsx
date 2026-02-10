import { useState, FormEvent, ChangeEvent } from 'react';
import './BudgetInputForm.css';

/**
 * BudgetInputForm component - Collects event constraints from users
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.8, 1.9
 * 
 * Note: Food and decor options have been removed from the platform.
 * This form only includes: time range, budget, location, and attendees fields.
 */

interface BudgetInputFormProps {
  onSubmit?: (constraints: FormData) => void;
}

export interface FormData {
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
}

interface ValidationErrors {
  startDate?: string;
  endDate?: string;
  dateRange?: string;
  minBudget?: string;
  maxBudget?: string;
  budgetRange?: string;
  location?: string;
  attendees?: string;
}

function BudgetInputForm({ onSubmit }: BudgetInputFormProps) {
  const [formData, setFormData] = useState<FormData>({
    timeRange: {
      startDate: '',
      endDate: '',
    },
    budget: {
      min: 0,
      max: 0,
    },
    location: '',
    attendees: 0,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  /**
   * Validates the form data and returns validation errors
   * Requirements: 1.8, 1.9
   */
  const validateForm = (): ValidationErrors => {
    return validateFormData(formData);
  };

  /**
   * Helper function to validate any form data object
   */
  const validateFormData = (data: FormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Validate required fields
    if (!data.timeRange.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!data.timeRange.endDate) {
      newErrors.endDate = 'End date is required';
    }

    // Validate date range (start before end)
    if (data.timeRange.startDate && data.timeRange.endDate) {
      const startDate = new Date(data.timeRange.startDate);
      const endDate = new Date(data.timeRange.endDate);
      
      if (startDate >= endDate) {
        newErrors.dateRange = 'End date must be after start date';
      }
    }

    // Validate budget - positive values
    if (data.budget.min < 0) {
      newErrors.minBudget = 'Minimum budget must be positive';
    }

    if (data.budget.max < 0) {
      newErrors.maxBudget = 'Maximum budget must be positive';
    }

    // Validate budget range (min <= max)
    if (data.budget.min > 0 && data.budget.max > 0) {
      if (data.budget.min > data.budget.max) {
        newErrors.budgetRange = 'Minimum budget must be less than or equal to maximum budget';
      }
    }

    // Validate location
    if (!data.location || data.location.trim() === '') {
      newErrors.location = 'Location is required';
    }

    // Validate attendees (positive integer)
    if (data.attendees <= 0) {
      newErrors.attendees = 'Number of attendees must be a positive integer';
    }

    if (!Number.isInteger(data.attendees)) {
      newErrors.attendees = 'Number of attendees must be a whole number';
    }

    return newErrors;
  };

  /**
   * Marks a field as touched for validation display
   */
  const markFieldTouched = (fieldName: string) => {
    setTouched(prev => new Set(prev).add(fieldName));
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      timeRange: {
        ...formData.timeRange,
        startDate: e.target.value,
      },
    };
    setFormData(newFormData);
    markFieldTouched('startDate');
    
    // Re-validate if any date field has been touched
    if (touched.has('startDate') || touched.has('endDate')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      timeRange: {
        ...formData.timeRange,
        endDate: e.target.value,
      },
    };
    setFormData(newFormData);
    markFieldTouched('endDate');
    
    // Re-validate if any date field has been touched
    if (touched.has('startDate') || touched.has('endDate')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleMinBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      budget: {
        ...formData.budget,
        min: Number(e.target.value),
      },
    };
    setFormData(newFormData);
    markFieldTouched('minBudget');
    
    // Re-validate if any budget field has been touched
    if (touched.has('minBudget') || touched.has('maxBudget')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleMaxBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      budget: {
        ...formData.budget,
        max: Number(e.target.value),
      },
    };
    setFormData(newFormData);
    markFieldTouched('maxBudget');
    
    // Re-validate if any budget field has been touched
    if (touched.has('minBudget') || touched.has('maxBudget')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      location: e.target.value,
    };
    setFormData(newFormData);
    markFieldTouched('location');
    
    // Re-validate if field has been touched
    if (touched.has('location')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleAttendeesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFormData = {
      ...formData,
      attendees: Number(e.target.value),
    };
    setFormData(newFormData);
    markFieldTouched('attendees');
    
    // Re-validate if field has been touched
    if (touched.has('attendees')) {
      setErrors(validateFormData(newFormData));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Mark all fields as touched on submit
    setTouched(new Set(['startDate', 'endDate', 'minBudget', 'maxBudget', 'location', 'attendees']));
    
    // Validate form
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    // Only submit if no errors
    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  return (
    <form className="budget-input-form" onSubmit={handleSubmit}>
      <h2>Event Details</h2>

      {/* Time Range Section */}
      <div className="form-section">
        <h3>Time Range</h3>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="start-date"
              name="startDate"
              value={formData.timeRange.startDate}
              onChange={handleStartDateChange}
              onBlur={() => markFieldTouched('startDate')}
              className={touched.has('startDate') && errors.startDate ? 'error' : ''}
              required
            />
            {touched.has('startDate') && errors.startDate && (
              <span className="error-message">{errors.startDate}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="end-date"
              name="endDate"
              value={formData.timeRange.endDate}
              onChange={handleEndDateChange}
              onBlur={() => markFieldTouched('endDate')}
              className={touched.has('endDate') && errors.endDate ? 'error' : ''}
              required
            />
            {touched.has('endDate') && errors.endDate && (
              <span className="error-message">{errors.endDate}</span>
            )}
          </div>
        </div>
        {(touched.has('startDate') || touched.has('endDate')) && errors.dateRange && (
          <div className="error-message range-error">{errors.dateRange}</div>
        )}
      </div>

      {/* Budget Section */}
      <div className="form-section">
        <h3>Budget</h3>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="min-budget">Minimum Budget ($)</label>
            <input
              type="number"
              id="min-budget"
              name="minBudget"
              value={formData.budget.min}
              onChange={handleMinBudgetChange}
              onBlur={() => markFieldTouched('minBudget')}
              className={touched.has('minBudget') && errors.minBudget ? 'error' : ''}
              min="0"
              step="100"
              required
            />
            {touched.has('minBudget') && errors.minBudget && (
              <span className="error-message">{errors.minBudget}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="max-budget">Maximum Budget ($)</label>
            <input
              type="number"
              id="max-budget"
              name="maxBudget"
              value={formData.budget.max}
              onChange={handleMaxBudgetChange}
              onBlur={() => markFieldTouched('maxBudget')}
              className={touched.has('maxBudget') && errors.maxBudget ? 'error' : ''}
              min="0"
              step="100"
              required
            />
            {touched.has('maxBudget') && errors.maxBudget && (
              <span className="error-message">{errors.maxBudget}</span>
            )}
          </div>
        </div>
        {(touched.has('minBudget') || touched.has('maxBudget')) && errors.budgetRange && (
          <div className="error-message range-error">{errors.budgetRange}</div>
        )}
      </div>

      {/* Location Section */}
      <div className="form-section">
        <h3>Location</h3>
        <div className="form-field">
          <label htmlFor="location">Venue Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            onBlur={() => markFieldTouched('location')}
            className={touched.has('location') && errors.location ? 'error' : ''}
            placeholder="e.g., New York, San Francisco"
            required
          />
          {touched.has('location') && errors.location && (
            <span className="error-message">{errors.location}</span>
          )}
        </div>
      </div>

      {/* Attendees Section */}
      <div className="form-section">
        <h3>Attendees</h3>
        <div className="form-field">
          <label htmlFor="attendees">Number of Attendees</label>
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={formData.attendees}
            onChange={handleAttendeesChange}
            onBlur={() => markFieldTouched('attendees')}
            className={touched.has('attendees') && errors.attendees ? 'error' : ''}
            min="1"
            step="1"
            required
          />
          {touched.has('attendees') && errors.attendees && (
            <span className="error-message">{errors.attendees}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <button type="submit" className="submit-button">
          Get Recommendations
        </button>
      </div>
    </form>
  );
}

export default BudgetInputForm;
