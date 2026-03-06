import { noteRecordToNote } from './note-record-to-note.function';

describe('noteRecordToNote', () => {
  it('should map id correctly', () => {
    const record = {
      id: 'abc-123',
      date: '2025-03-15T00:00:00.000Z',
      content: 'Test',
      reminderDaysBefore: 0,
    };

    expect(noteRecordToNote(record).id).toBe('abc-123');
  });

  it('should convert date string to a Date object', () => {
    const record = {
      id: 'abc-123',
      date: '2025-03-15T00:00:00.000Z',
      content: 'Test',
      reminderDaysBefore: 0,
    };

    expect(noteRecordToNote(record).date).toBeInstanceOf(Date);
  });

  it('should parse the date string into the correct date', () => {
    const record = {
      id: 'abc-123',
      date: '2025-03-15T00:00:00.000Z',
      content: 'Test',
      reminderDaysBefore: 0,
    };

    expect(noteRecordToNote(record).date.toISOString()).toBe(
      '2025-03-15T00:00:00.000Z',
    );
  });

  it('should map content correctly', () => {
    const record = {
      id: 'abc-123',
      date: '2025-03-15T00:00:00.000Z',
      content: 'My note content',
      reminderDaysBefore: 0,
    };

    expect(noteRecordToNote(record).content).toBe('My note content');
  });

  it('should map reminderDaysBefore correctly', () => {
    const record = {
      id: 'abc-123',
      date: '2025-03-15T00:00:00.000Z',
      content: 'Test',
      reminderDaysBefore: 3,
    };

    expect(noteRecordToNote(record).reminderDaysBefore).toBe(3);
  });
});
