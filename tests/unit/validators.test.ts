import { describe, it, expect } from 'vitest';
// import { validateHabitName } from '@/lib/validators';
import { validateHabitName } from '@/lib/validators';

describe('validateHabitName', () => { // [cite: 300]
  it('returns an error when habit name is empty', () => { // [cite: 302]
    const result = validateHabitName('   ');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Habit name is required');
  });

  it('returns an error when habit name exceeds 60 characters', () => { // [cite: 303]
    const longName = 'a'.repeat(61);
    const result = validateHabitName(longName);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Habit name must be 60 characters or fewer');
  });

  it('returns a trimmed value when habit name is valid', () => { // [cite: 304]
    const result = validateHabitName('  Exercise  ');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Exercise');
    expect(result.error).toBeNull();
  });
});