import { describe, it, expect } from 'vitest';
import type { EventConstraints, VenueOption, FoodOption, DecorOption } from './index';

describe('Shared Types', () => {
  it('should allow valid EventConstraints', () => {
    const constraints: EventConstraints = {
      timeRange: {
        startDate: '2024-06-01',
        endDate: '2024-06-03',
      },
      budget: {
        min: 5000,
        max: 10000,
      },
      location: 'New York',
      attendees: 100,
      foodOptions: ['buffet', 'vegetarian'],
      decorOptions: ['modern', 'elegant'],
    };

    expect(constraints.attendees).toBe(100);
    expect(constraints.location).toBe('New York');
  });

  it('should allow valid VenueOption', () => {
    const venue: VenueOption = {
      id: 'venue-1',
      name: 'Grand Ballroom',
      location: 'New York',
      capacity: 200,
      pricePerDay: 2000,
      amenities: ['parking', 'wifi', 'catering'],
      description: 'A beautiful ballroom',
    };

    expect(venue.capacity).toBe(200);
    expect(venue.pricePerDay).toBe(2000);
  });

  it('should allow valid FoodOption', () => {
    const food: FoodOption = {
      id: 'food-1',
      name: 'Buffet Package',
      type: 'buffet',
      pricePerPerson: 50,
      minAttendees: 50,
      maxAttendees: 200,
      dietaryOptions: ['vegetarian', 'vegan'],
      description: 'Delicious buffet',
    };

    expect(food.pricePerPerson).toBe(50);
    expect(food.type).toBe('buffet');
  });

  it('should allow valid DecorOption', () => {
    const decor: DecorOption = {
      id: 'decor-1',
      name: 'Modern Package',
      style: 'modern',
      totalPrice: 1500,
      description: 'Contemporary decor',
      includes: ['centerpieces', 'lighting', 'linens'],
    };

    expect(decor.totalPrice).toBe(1500);
    expect(decor.style).toBe('modern');
  });
});
