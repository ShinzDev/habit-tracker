export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (!today || completions.length === 0) return 0;

  // 1. Remove duplicates and sort dates from newest to oldest [cite: 137, 138]
  const uniqueDates = Array.from(new Set(completions)).sort((a, b) => b.localeCompare(a));

  // 2. If today is not in the completions, the streak is instantly 0 [cite: 139]
  if (!uniqueDates.includes(today)) return 0;

  let streak = 0;
  const currentDate = new Date(today);

  // 3. Loop through the sorted dates and count backwards
  for (const dateStr of uniqueDates) {
    const loopDate = new Date(dateStr);
    
    // We only care about the Date portion (YYYY-MM-DD), not the exact time
    loopDate.setHours(0, 0, 0, 0);
    const expectedDate = new Date(currentDate);
    expectedDate.setHours(0, 0, 0, 0);

    if (loopDate.getTime() === expectedDate.getTime()) {
      streak++;
      // Move our "expected" date back by exactly one day for the next loop iteration
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (loopDate.getTime() < expectedDate.getTime()) {
      // If the loop date is older than our expected date, the streak is broken
      break; 
    }
  }

  return streak;
}