import { noteToNoteRecord } from './note-to-note-record.function';

describe('noteToNoteRecord', () => {
  it('should map id correctly', () => {
    const note = { id: 'abc-123', date: new Date('2025-03-15T00:00:00.000Z'), content: 'Test', reminderDaysBefore: 0 };

    expect(noteToNoteRecord(note).id).toBe('abc-123');
  });

  it('should convert date to an ISO string', () => {
    const note = { id: 'abc-123', date: new Date('2025-03-15T00:00:00.000Z'), content: 'Test', reminderDaysBefore: 0 };

    expect(noteToNoteRecord(note).date).toBe('2025-03-15T00:00:00.000Z');
  });

  it('should map content correctly', () => {
    const note = { id: 'abc-123', date: new Date('2025-03-15T00:00:00.000Z'), content: 'My note content', reminderDaysBefore: 0 };

    expect(noteToNoteRecord(note).content).toBe('My note content');
  });

  it('should map reminderDaysBefore correctly', () => {
    const note = { id: 'abc-123', date: new Date('2025-03-15T00:00:00.000Z'), content: 'Test', reminderDaysBefore: 3 };

    expect(noteToNoteRecord(note).reminderDaysBefore).toBe(3);
  });
});
