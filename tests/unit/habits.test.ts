import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => { // [cite: 326]
  const mockHabit: Habit = {
    id: '1',
    userId: 'user1',
    name: 'Read',
    description: '',
    frequency: 'daily',
    createdAt: '2026-04-28',
    completions: ['2026-04-27'],
  };

  it('adds a completion date when the date is not present', () => { // [cite: 328]
    const updated = toggleHabitCompletion(mockHabit, '2026-04-28');
    expect(updated.completions).toContain('2026-04-28');
    expect(updated.completions.length).toBe(2);
  });

  it('removes a completion date when the date already exists', () => { // [cite: 329]
    const updated = toggleHabitCompletion(mockHabit, '2026-04-27');
    expect(updated.completions).not.toContain('2026-04-27');
    expect(updated.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => { // [cite: 330]
    toggleHabitCompletion(mockHabit, '2026-04-28');
    expect(mockHabit.completions).toEqual(['2026-04-27']); // Original is untouched
  });

  it('does not return duplicate completion dates', () => { // [cite: 331]
    // Force a duplicate into the mock to test the safeguard
    const duplicateHabit = { ...mockHabit, completions: ['2026-04-27', '2026-04-27'] };
    const updated = toggleHabitCompletion(duplicateHabit, '2026-04-28');
    
    // The resulting array should only have unique values
    expect(updated.completions).toEqual(['2026-04-27', '2026-04-28']);
  });
});