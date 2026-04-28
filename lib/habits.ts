;

import { Habit } from '../types/habit';

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const hasCompleted = habit.completions.includes(date);

  // If it exists, filter it out. If it doesn't, add it.
  const newCompletions = hasCompleted
    ? habit.completions.filter((d) => d !== date) // [cite: 151]
    : [...habit.completions, date]; // [cite: 150]

  // Enforce the rule that returned habit must not contain duplicate dates [cite: 152]
  const uniqueCompletions = Array.from(new Set(newCompletions));

  return {
    ...habit,
    completions: uniqueCompletions,
  };
}