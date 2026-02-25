import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('task3', () => {
  let mockDate: MockDateSetup;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
  });

  it('returns current date when no arguments provided', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-01T00:00:00.100Z'));

    expect(getUtcStringDate()).toBe('2026-01-01T00:00:00.100Z');

    jest.useRealTimers();
  });

  it('returns correct ISO date in timezone -2', () => {
    mockDate.set({ isoDate: '2026-01-02T12:00:00.000Z', offset: -120 });

    expect(getUtcStringDate(new Date())).toBe('2026-01-02T14:00:00.000Z');
  });

  it('returns correct ISO date in timezone -5', () => {
    mockDate.set({ isoDate: '2026-01-02T12:00:00.000Z', offset: -300 });

    expect(getUtcStringDate(new Date())).toBe('2026-01-02T17:00:00.000Z');
  });

  it('returns correct ISO date in timezone +5', () => {
    mockDate.set({ isoDate: '2026-01-02T12:00:00.000Z', offset: 300 });

    expect(getUtcStringDate(new Date())).toBe('2026-01-02T07:00:00.000Z');
  });

  it('returns correct ISO date in timezone +5 when close to midnight', () => {
    mockDate.set({ isoDate: '2026-01-02T01:00:00.000Z', offset: 300 });

    expect(getUtcStringDate(new Date())).toBe('2026-01-01T20:00:00.000Z');
  });

  it('returns correct ISO date in timezone -5 when close to midnight', () => {
    mockDate.set({ isoDate: '2026-01-02T22:00:00.000Z', offset: -300 });

    expect(getUtcStringDate(new Date())).toBe('2026-01-03T03:00:00.000Z');
  });
});
