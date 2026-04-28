import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '@/lib/streaks';

/* MENTOR_TRACE_STAGE3_HABIT_A91 */ // [cite: 309]

describe('calculateCurrentStreak', () => { // [cite: 317]
  it('returns 0 when completions is empty', () => { // [cite: 319]
    expect(calculateCurrentStreak([], '2026-04-28')).toBe(0);
  });

  it('returns 0 when today is not completed', () => { // [cite: 320]
    expect(calculateCurrentStreak(['2026-04-27', '2026-04-26'], '2026-04-28')).toBe(0);
  });

  it('returns the correct streak for consecutive completed days', () => { // [cite: 321]
    const completions = ['2026-04-28', '2026-04-27', '2026-04-26'];
    expect(calculateCurrentStreak(completions, '2026-04-28')).toBe(3);
  });

  it('ignores duplicate completion dates', () => { // [cite: 322]
    const completions = ['2026-04-28', '2026-04-28', '2026-04-27'];
    expect(calculateCurrentStreak(completions, '2026-04-28')).toBe(2);
  });

  it('breaks the streak when a calendar day is missing', () => { // [cite: 323]
    // 27th is missing
    const completions = ['2026-04-28', '2026-04-26', '2026-04-25']; 
    expect(calculateCurrentStreak(completions, '2026-04-28')).toBe(1);
  });
});