import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BudgetInputForm from './BudgetInputForm';

/**
 * Unit tests for BudgetInputForm component
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.8, 1.9
 */

describe('BudgetInputForm', () => {
  it('should render all required form fields', () => {
    render(<BudgetInputForm />);

    // Check for time range fields
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument();

    // Check for budget fields
    expect(screen.getByLabelText(/minimum budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/maximum budget/i)).toBeInTheDocument();

    // Check for location field
    expect(screen.getByLabelText(/venue location/i)).toBeInTheDocument();

    // Check for attendees field
    expect(screen.getByLabelText(/number of attendees/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole('button', { name: /get recommendations/i })).toBeInTheDocument();
  });

  it('should have correct input types for each field', () => {
    render(<BudgetInputForm />);

    // Date inputs
    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);
    expect(startDateInput).toHaveAttribute('type', 'date');
    expect(endDateInput).toHaveAttribute('type', 'date');

    // Number inputs
    const minBudgetInput = screen.getByLabelText(/minimum budget/i);
    const maxBudgetInput = screen.getByLabelText(/maximum budget/i);
    const attendeesInput = screen.getByLabelText(/number of attendees/i);
    expect(minBudgetInput).toHaveAttribute('type', 'number');
    expect(maxBudgetInput).toHaveAttribute('type', 'number');
    expect(attendeesInput).toHaveAttribute('type', 'number');

    // Text input
    const locationInput = screen.getByLabelText(/venue location/i);
    expect(locationInput).toHaveAttribute('type', 'text');
  });

  it('should update form state when fields are changed', () => {
    render(<BudgetInputForm />);

    // Update start date
    const startDateInput = screen.getByLabelText(/start date/i) as HTMLInputElement;
    fireEvent.change(startDateInput, { target: { value: '2024-06-01' } });
    expect(startDateInput.value).toBe('2024-06-01');

    // Update end date
    const endDateInput = screen.getByLabelText(/end date/i) as HTMLInputElement;
    fireEvent.change(endDateInput, { target: { value: '2024-06-05' } });
    expect(endDateInput.value).toBe('2024-06-05');

    // Update min budget
    const minBudgetInput = screen.getByLabelText(/minimum budget/i) as HTMLInputElement;
    fireEvent.change(minBudgetInput, { target: { value: '5000' } });
    expect(minBudgetInput.value).toBe('5000');

    // Update max budget
    const maxBudgetInput = screen.getByLabelText(/maximum budget/i) as HTMLInputElement;
    fireEvent.change(maxBudgetInput, { target: { value: '10000' } });
    expect(maxBudgetInput.value).toBe('10000');

    // Update location
    const locationInput = screen.getByLabelText(/venue location/i) as HTMLInputElement;
    fireEvent.change(locationInput, { target: { value: 'New York' } });
    expect(locationInput.value).toBe('New York');

    // Update attendees
    const attendeesInput = screen.getByLabelText(/number of attendees/i) as HTMLInputElement;
    fireEvent.change(attendeesInput, { target: { value: '100' } });
    expect(attendeesInput.value).toBe('100');
  });

  it('should call onSubmit with form data when submitted', () => {
    const mockOnSubmit = vi.fn();
    render(<BudgetInputForm onSubmit={mockOnSubmit} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2024-06-01' } });
    fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2024-06-05' } });
    fireEvent.change(screen.getByLabelText(/minimum budget/i), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/maximum budget/i), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText(/venue location/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByLabelText(/number of attendees/i), { target: { value: '100' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /get recommendations/i });
    fireEvent.click(submitButton);

    // Verify onSubmit was called with correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      timeRange: {
        startDate: '2024-06-01',
        endDate: '2024-06-05',
      },
      budget: {
        min: 5000,
        max: 10000,
      },
      location: 'New York',
      attendees: 100,
    });
  });

  it('should have required attribute on all fields', () => {
    render(<BudgetInputForm />);

    expect(screen.getByLabelText(/start date/i)).toBeRequired();
    expect(screen.getByLabelText(/end date/i)).toBeRequired();
    expect(screen.getByLabelText(/minimum budget/i)).toBeRequired();
    expect(screen.getByLabelText(/maximum budget/i)).toBeRequired();
    expect(screen.getByLabelText(/venue location/i)).toBeRequired();
    expect(screen.getByLabelText(/number of attendees/i)).toBeRequired();
  });

  it('should have appropriate min values for number inputs', () => {
    render(<BudgetInputForm />);

    const minBudgetInput = screen.getByLabelText(/minimum budget/i);
    const maxBudgetInput = screen.getByLabelText(/maximum budget/i);
    const attendeesInput = screen.getByLabelText(/number of attendees/i);

    expect(minBudgetInput).toHaveAttribute('min', '0');
    expect(maxBudgetInput).toHaveAttribute('min', '0');
    expect(attendeesInput).toHaveAttribute('min', '1');
  });

  it('should have placeholder text for location field', () => {
    render(<BudgetInputForm />);

    const locationInput = screen.getByLabelText(/venue location/i);
    expect(locationInput).toHaveAttribute('placeholder');
  });

  // Validation tests - Requirements: 1.8, 1.9
  describe('Form Validation', () => {
    it('should display error when end date is before start date', () => {
      render(<BudgetInputForm />);

      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);

      // Set end date before start date
      fireEvent.change(startDateInput, { target: { value: '2024-06-10' } });
      fireEvent.blur(startDateInput);
      fireEvent.change(endDateInput, { target: { value: '2024-06-05' } });
      fireEvent.blur(endDateInput);

      // Check for date range error
      expect(screen.getByText(/end date must be after start date/i)).toBeInTheDocument();
    });

    it('should display error when minimum budget is greater than maximum budget', () => {
      render(<BudgetInputForm />);

      const minBudgetInput = screen.getByLabelText(/minimum budget/i);
      const maxBudgetInput = screen.getByLabelText(/maximum budget/i);

      // Set min budget greater than max budget
      fireEvent.change(minBudgetInput, { target: { value: '10000' } });
      fireEvent.blur(minBudgetInput);
      fireEvent.change(maxBudgetInput, { target: { value: '5000' } });
      fireEvent.blur(maxBudgetInput);

      // Check for budget range error
      expect(screen.getByText(/minimum budget must be less than or equal to maximum budget/i)).toBeInTheDocument();
    });

    it('should display error when budget values are negative', () => {
      render(<BudgetInputForm />);

      const minBudgetInput = screen.getByLabelText(/minimum budget/i);

      // Set negative budget
      fireEvent.change(minBudgetInput, { target: { value: '-1000' } });
      fireEvent.blur(minBudgetInput);

      // Check for positive budget error
      expect(screen.getByText(/minimum budget must be positive/i)).toBeInTheDocument();
    });

    it('should display error when attendees is zero or negative', () => {
      render(<BudgetInputForm />);

      const attendeesInput = screen.getByLabelText(/number of attendees/i);

      // Set zero attendees
      fireEvent.change(attendeesInput, { target: { value: '0' } });
      fireEvent.blur(attendeesInput);

      // Check for positive attendees error
      expect(screen.getByText(/number of attendees must be a positive integer/i)).toBeInTheDocument();
    });

    it('should display error when location is empty', () => {
      render(<BudgetInputForm />);

      const locationInput = screen.getByLabelText(/venue location/i);

      // Focus and blur without entering value
      fireEvent.focus(locationInput);
      fireEvent.blur(locationInput);

      // Check for location required error
      expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    });

    it('should not call onSubmit when form has validation errors', () => {
      const mockOnSubmit = vi.fn();
      render(<BudgetInputForm onSubmit={mockOnSubmit} />);

      // Fill form with invalid data
      fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2024-06-10' } });
      fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2024-06-05' } }); // Invalid: before start
      fireEvent.change(screen.getByLabelText(/minimum budget/i), { target: { value: '10000' } });
      fireEvent.change(screen.getByLabelText(/maximum budget/i), { target: { value: '5000' } }); // Invalid: less than min
      fireEvent.change(screen.getByLabelText(/venue location/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/number of attendees/i), { target: { value: '100' } });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /get recommendations/i });
      fireEvent.click(submitButton);

      // Verify onSubmit was NOT called due to validation errors
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit when form is valid', () => {
      const mockOnSubmit = vi.fn();
      render(<BudgetInputForm onSubmit={mockOnSubmit} />);

      // Fill form with valid data
      fireEvent.change(screen.getByLabelText(/start date/i), { target: { value: '2024-06-01' } });
      fireEvent.change(screen.getByLabelText(/end date/i), { target: { value: '2024-06-05' } });
      fireEvent.change(screen.getByLabelText(/minimum budget/i), { target: { value: '5000' } });
      fireEvent.change(screen.getByLabelText(/maximum budget/i), { target: { value: '10000' } });
      fireEvent.change(screen.getByLabelText(/venue location/i), { target: { value: 'New York' } });
      fireEvent.change(screen.getByLabelText(/number of attendees/i), { target: { value: '100' } });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /get recommendations/i });
      fireEvent.click(submitButton);

      // Verify onSubmit was called
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('should clear error when invalid field is corrected', () => {
      render(<BudgetInputForm />);

      const startDateInput = screen.getByLabelText(/start date/i);
      const endDateInput = screen.getByLabelText(/end date/i);

      // Set invalid date range
      fireEvent.change(startDateInput, { target: { value: '2024-06-10' } });
      fireEvent.blur(startDateInput);
      fireEvent.change(endDateInput, { target: { value: '2024-06-05' } });
      fireEvent.blur(endDateInput);

      // Verify error is shown
      expect(screen.getByText(/end date must be after start date/i)).toBeInTheDocument();

      // Correct the end date
      fireEvent.change(endDateInput, { target: { value: '2024-06-15' } });

      // Verify error is cleared
      expect(screen.queryByText(/end date must be after start date/i)).not.toBeInTheDocument();
    });

    it('should add error styling to invalid fields', () => {
      render(<BudgetInputForm />);

      const attendeesInput = screen.getByLabelText(/number of attendees/i);

      // Set invalid value
      fireEvent.change(attendeesInput, { target: { value: '0' } });
      fireEvent.blur(attendeesInput);

      // Check for error class
      expect(attendeesInput).toHaveClass('error');
    });
  });
});
