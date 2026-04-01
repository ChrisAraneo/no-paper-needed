import { TestBed } from '@angular/core/testing';
import { Note, NoteRecord } from '@no-paper-needed/interfaces';
import { DATE_FORMAT, FALLBACK_LOCALE } from '@no-paper-needed/shared/tokens';
import { firstValueFrom } from 'rxjs';

import { StoreService } from './store.service';

const createNote = (overrides: Partial<Note> = {}): Note => ({
  id: '1',
  date: new Date('2025-06-15'),
  content: 'Test note',
  reminderDaysBefore: 0,
  ...overrides,
});

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DATE_FORMAT, useValue: 'EEEE dd.MM' },
        { provide: FALLBACK_LOCALE, useValue: 'en' },
      ],
    });
    service = TestBed.inject(StoreService);
  });

  afterEach(async () => {
    indexedDB.deleteDatabase('NoPaperNeededDB');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addNote()', () => {
    it('should add a note to an empty store', async () => {
      const note = createNote();
      await firstValueFrom(service.addNote(note));

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([[note]]);
    });

    it('should append a note to existing notes', async () => {
      const note1 = createNote({ id: '1', content: 'First' });
      const note2 = createNote({ id: '2', content: 'Second' });

      await firstValueFrom(service.addNote(note1));
      await firstValueFrom(service.addNote(note2));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toHaveLength(2);
    });
  });

  describe('editNote()', () => {
    it('should update an existing note by id', async () => {
      const note = createNote({ id: 'abc', content: 'Original' });
      await firstValueFrom(service.addNote(note));

      const updated = createNote({ id: 'abc', content: 'Updated' });
      await firstValueFrom(service.editNote(updated));

      const result = await firstValueFrom(service.getNotes());
      expect(result[0].content).toBe('Updated');
    });

    it('should not modify the store if id is not found', async () => {
      const note = createNote({ id: '1', content: 'Original' });
      await firstValueFrom(service.addNote(note));

      const unknown = createNote({ id: 'unknown', content: 'Ghost' });
      await firstValueFrom(service.editNote(unknown));

      const result = await firstValueFrom(service.getNotes());
      expect(result[0].content).toBe('Original');
    });

    it('should upsert a note when editing with non-existent id on empty store', async () => {
      const note = createNote({ id: 'nope' });
      await firstValueFrom(service.editNote(note));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('nope');
    });
  });

  describe('removeNote()', () => {
    it('should remove a note by index', async () => {
      await firstValueFrom(service.addNote(createNote({ id: '1' })));
      await firstValueFrom(service.addNote(createNote({ id: '2' })));
      await firstValueFrom(service.addNote(createNote({ id: '3' })));

      await firstValueFrom(service.removeNote(1));

      const result = await firstValueFrom(service.getNotes());
      const ids = result.map((n) => n.id);
      expect(ids).toEqual(['1', '3']);
    });

    it('should remove the first note when index is 0', async () => {
      await firstValueFrom(service.addNote(createNote({ id: '1' })));
      await firstValueFrom(service.addNote(createNote({ id: '2' })));

      await firstValueFrom(service.removeNote(0));

      const result = await firstValueFrom(service.getNotes());
      expect(result[0].id).toBe('2');
    });

    it('should remove the last note when index is last', async () => {
      await firstValueFrom(service.addNote(createNote({ id: '1' })));
      await firstValueFrom(service.addNote(createNote({ id: '2' })));

      await firstValueFrom(service.removeNote(1));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should not remove anything if index is out of bounds', async () => {
      await firstValueFrom(service.addNote(createNote({ id: '1' })));

      await firstValueFrom(service.removeNote(5));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toHaveLength(1);
    });
  });

  describe('getNotes()', () => {
    it('should return an empty array initially', async () => {
      const result = await firstValueFrom(service.getNotes());
      expect(result).toEqual([]);
    });

    it('should return all added notes', async () => {
      const note1 = createNote({ id: '1' });
      const note2 = createNote({ id: '2' });
      await firstValueFrom(service.addNote(note1));
      await firstValueFrom(service.addNote(note2));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toEqual([note1, note2]);
    });
  });

  describe('getNoteTableForDate()', () => {
    it('should return empty array when store is empty', async () => {
      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should include a note whose date matches the given date', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-15') })),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result.flat()).toHaveLength(1);
    });

    it('should include a future note with reminderDaysBefore covering today', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({
            date: new Date('2025-06-17'),
            reminderDaysBefore: 3,
          }),
        ),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result.flat()).toHaveLength(1);
    });

    it('should exclude a future note whose reminder does not cover today', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({
            date: new Date('2025-06-20'),
            reminderDaysBefore: 2,
          }),
        ),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should exclude past notes (outdated)', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-10') })),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should sort notes by date ascending', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({
            id: 'late',
            date: new Date('2025-06-16'),
            reminderDaysBefore: 1,
          }),
        ),
      );
      await firstValueFrom(
        service.addNote(
          createNote({ id: 'early', date: new Date('2025-06-15') }),
        ),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      const ids = result.flat().map((n) => n.id);
      expect(ids).toEqual(['early', 'late']);
    });

    it('should group notes into rows of 3', async () => {
      for (let i = 1; i <= 7; i++) {
        await firstValueFrom(
          service.addNote(
            createNote({ id: String(i), date: new Date('2025-06-15') }),
          ),
        );
      }

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveLength(3);
      expect(result[1]).toHaveLength(3);
      expect(result[2]).toHaveLength(1);
    });

    it('should include a note on its exact date with reminderDaysBefore=0', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({ date: new Date('2025-06-15'), reminderDaysBefore: 0 }),
        ),
      );

      const result = await firstValueFrom(
        service.getNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result.flat()).toHaveLength(1);
    });
  });

  describe('getOutdatedNoteTableForDate()', () => {
    it('should return empty array when store is empty', async () => {
      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should include notes whose date is before the given date', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-10') })),
      );

      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result.flat()).toHaveLength(1);
    });

    it('should exclude notes whose date matches the given date', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-15') })),
      );

      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should exclude future notes', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-20') })),
      );

      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toEqual([]);
    });

    it('should sort outdated notes by date ascending', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({ id: 'older', date: new Date('2025-06-05') }),
        ),
      );
      await firstValueFrom(
        service.addNote(
          createNote({ id: 'newer', date: new Date('2025-06-12') }),
        ),
      );

      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      const ids = result.flat().map((n) => n.id);
      expect(ids).toEqual(['older', 'newer']);
    });

    it('should group outdated notes into rows of 3', async () => {
      for (let i = 1; i <= 4; i++) {
        await firstValueFrom(
          service.addNote(
            createNote({ id: String(i), date: new Date(`2025-06-0${i}`) }),
          ),
        );
      }

      const result = await firstValueFrom(
        service.getOutdatedNoteTableForDate(new Date('2025-06-15')),
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveLength(3);
      expect(result[1]).toHaveLength(1);
    });
  });

  describe('searchNotes()', () => {
    it('should return empty array for empty query', async () => {
      await firstValueFrom(service.addNote(createNote({ content: 'Hello' })));

      const result = await firstValueFrom(service.searchNotes(''));
      expect(result).toEqual([]);
    });

    it('should return empty array for whitespace-only query', async () => {
      await firstValueFrom(service.addNote(createNote({ content: 'Hello' })));

      const result = await firstValueFrom(service.searchNotes('   '));
      expect(result).toEqual([]);
    });

    it('should find notes by content (case-insensitive)', async () => {
      await firstValueFrom(
        service.addNote(createNote({ id: '1', content: 'Buy groceries' })),
      );
      await firstValueFrom(
        service.addNote(createNote({ id: '2', content: 'Call dentist' })),
      );

      const result = await firstValueFrom(service.searchNotes('groceries'));
      expect(result.flat()).toHaveLength(1);
      expect(result[0][0].id).toBe('1');
    });

    it('should find notes by content case-insensitively', async () => {
      await firstValueFrom(
        service.addNote(createNote({ content: 'Buy Groceries' })),
      );

      const result = await firstValueFrom(service.searchNotes('buy'));
      expect(result.flat()).toHaveLength(1);
    });

    it('should find notes by id', async () => {
      await firstValueFrom(
        service.addNote(createNote({ id: 'unique-id-123' })),
      );

      const result = await firstValueFrom(service.searchNotes('unique-id-123'));
      expect(result.flat()).toHaveLength(1);
    });

    it('should find notes by date string', async () => {
      await firstValueFrom(
        service.addNote(createNote({ date: new Date('2025-06-15') })),
      );

      const result = await firstValueFrom(service.searchNotes('2025-06-15'));
      expect(result.flat()).toHaveLength(1);
    });

    it('should return empty when no notes match', async () => {
      await firstValueFrom(service.addNote(createNote({ content: 'Hello' })));

      const result = await firstValueFrom(service.searchNotes('xyz'));
      expect(result).toEqual([]);
    });

    it('should sort search results by date ascending', async () => {
      await firstValueFrom(
        service.addNote(
          createNote({
            id: 'b',
            date: new Date('2025-06-20'),
            content: 'meeting',
          }),
        ),
      );
      await firstValueFrom(
        service.addNote(
          createNote({
            id: 'a',
            date: new Date('2025-06-10'),
            content: 'meeting',
          }),
        ),
      );

      const result = await firstValueFrom(service.searchNotes('meeting'));
      const ids = result.flat().map((n) => n.id);
      expect(ids).toEqual(['a', 'b']);
    });

    it('should group search results into rows of 3', async () => {
      for (let i = 1; i <= 5; i++) {
        await firstValueFrom(
          service.addNote(
            createNote({
              id: String(i),
              content: 'common',
              date: new Date('2025-06-15'),
            }),
          ),
        );
      }

      const result = await firstValueFrom(service.searchNotes('common'));
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveLength(3);
      expect(result[1]).toHaveLength(2);
    });

    it('should trim the query before searching', async () => {
      await firstValueFrom(service.addNote(createNote({ content: 'trimmed' })));

      const result = await firstValueFrom(service.searchNotes('  trimmed  '));
      expect(result.flat()).toHaveLength(1);
    });
  });

  describe('exportData()', () => {
    it('should return an empty array when store is empty', async () => {
      const result = await firstValueFrom(service.exportData());
      expect(result).toEqual([]);
    });

    it('should return all notes as NoteRecord[]', async () => {
      await firstValueFrom(
        service.addNote(createNote({ id: '1', content: 'First' })),
      );
      await firstValueFrom(
        service.addNote(createNote({ id: '2', content: 'Second' })),
      );

      const result = await firstValueFrom(service.exportData());
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });
  });

  describe('importData()', () => {
    it('should replace all existing notes with imported records', async () => {
      await firstValueFrom(
        service.addNote(createNote({ id: 'old', content: 'Old note' })),
      );

      const records: NoteRecord[] = [
        {
          id: 'new-1',
          date: '2025-07-01',
          content: 'Imported 1',
          reminderDaysBefore: 0,
        },
        {
          id: 'new-2',
          date: '2025-07-02',
          content: 'Imported 2',
          reminderDaysBefore: 1,
        },
      ];

      await firstValueFrom(service.importData(records));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toHaveLength(2);
      expect(result.map((n) => n.id)).toEqual(['new-1', 'new-2']);
    });

    it('should clear the store when importing an empty array', async () => {
      await firstValueFrom(
        service.addNote(createNote({ id: '1', content: 'Existing' })),
      );

      await firstValueFrom(service.importData([]));

      const result = await firstValueFrom(service.getNotes());
      expect(result).toEqual([]);
    });

    it('should persist imported data to the database', async () => {
      const records: NoteRecord[] = [
        {
          id: 'persisted',
          date: '2025-08-01',
          content: 'Persisted note',
          reminderDaysBefore: 0,
        },
      ];

      await firstValueFrom(service.importData(records));

      const exported = await firstValueFrom(service.exportData());
      expect(exported).toHaveLength(1);
      expect(exported[0].id).toBe('persisted');
    });

    it('should convert NoteRecord dates to Date objects in the store', async () => {
      const records: NoteRecord[] = [
        {
          id: '1',
          date: '2025-06-15',
          content: 'Test',
          reminderDaysBefore: 0,
        },
      ];

      await firstValueFrom(service.importData(records));

      const result = await firstValueFrom(service.getNotes());
      expect(result[0].date).toBeInstanceOf(Date);
    });
  });
});
