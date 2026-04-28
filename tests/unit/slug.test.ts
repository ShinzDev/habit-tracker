import { describe, it, expect } from 'vitest';
import { getHabitSlug } from '@/lib/slug';

describe('getHabitSlug', () => { // [cite: 293]
  it('returns lowercase hyphenated slug for a basic habit name', () => { // [cite: 295]
    expect(getHabitSlug('Drink Water')).toBe('drink-water');
  });

  it('trims outer spaces and collapses repeated internal spaces', () => { // [cite: 296]
    expect(getHabitSlug('  Read   Books  ')).toBe('read-books');
  });

  it('removes non alphanumeric characters except hyphens', () => { // [cite: 297]
    expect(getHabitSlug('Code 100% every-day!!')).toBe('code-100-every-day');
  });
});