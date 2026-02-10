import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

describe('Property-Based Testing Infrastructure', () => {
  it('should verify fast-check is working', () => {
    // Simple property: reversing a string twice returns the original
    fc.assert(
      fc.property(fc.string(), (str) => {
        const reversed = str.split('').reverse().join('');
        const doubleReversed = reversed.split('').reverse().join('');
        return doubleReversed === str;
      }),
      { numRuns: 100 }
    );
  });

  it('should verify fast-check with numbers', () => {
    // Property: adding zero to any number returns the same number
    fc.assert(
      fc.property(fc.integer(), (num) => {
        return num + 0 === num;
      }),
      { numRuns: 100 }
    );
  });

  it('should verify fast-check with arrays', () => {
    // Property: concatenating an empty array doesn't change the original
    fc.assert(
      fc.property(fc.array(fc.integer()), (arr) => {
        const result = arr.concat([]);
        return JSON.stringify(result) === JSON.stringify(arr);
      }),
      { numRuns: 100 }
    );
  });
});
