export function validateHabitName(name: string): { valid: boolean; value: string; error: string | null } {
  const trimmed = name.trim(); // [cite: 126]
  
  if (!trimmed) {
    return { valid: false, value: '', error: 'Habit name is required' }; // [cite: 127, 131]
  }
  
  if (trimmed.length > 60) {
    return { valid: false, value: trimmed, error: 'Habit name must be 60 characters or fewer' }; // [cite: 128, 132]
  }
  
  return { valid: true, value: trimmed, error: null }; // [cite: 129]
}