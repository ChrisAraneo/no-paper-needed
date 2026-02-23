import { getDayDiff } from './get-day-diff.function';

describe('getDayDiff', () => {
  it('should return 0 for the same day', () => {
    const a = new Date('2025-03-15');
    const b = new Date('2025-03-15');

    expect(getDayDiff(a, b)).toBe(0);
  });

  it('should return 0 for the same day with different times', () => {
    const a = new Date('2025-03-15T08:00:00');
    const b = new Date('2025-03-15T23:59:59');

    expect(getDayDiff(a, b)).toBe(0);
  });

  it('should return 1 when a is one day after b', () => {
    const a = new Date('2025-03-16');
    const b = new Date('2025-03-15');

    expect(getDayDiff(a, b)).toBe(1);
  });

  it('should return -1 when a is one day before b', () => {
    const a = new Date('2025-03-15');
    const b = new Date('2025-03-16');

    expect(getDayDiff(a, b)).toBe(-1);
  });

  it('should return positive number when a is multiple days after b', () => {
    const a = new Date('2025-03-20');
    const b = new Date('2025-03-15');

    expect(getDayDiff(a, b)).toBe(5);
  });

  it('should return negative number when a is multiple days before b', () => {
    const a = new Date('2025-03-10');
    const b = new Date('2025-03-15');

    expect(getDayDiff(a, b)).toBe(-5);
  });

  it('should normalize time and return 1 when a is just after midnight and b is just before midnight the day prior', () => {
    const a = new Date('2025-03-16T00:01:00');
    const b = new Date('2025-03-15T23:59:00');

    expect(getDayDiff(a, b)).toBe(1);
  });

  it('should handle dates across month boundaries', () => {
    const a = new Date('2025-04-01');
    const b = new Date('2025-03-31');

    expect(getDayDiff(a, b)).toBe(1);
  });

  it('should handle dates across year boundaries', () => {
    const a = new Date('2026-01-01');
    const b = new Date('2025-12-31');

    expect(getDayDiff(a, b)).toBe(1);
  });
});
