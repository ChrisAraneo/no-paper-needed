import { TestBed } from '@angular/core/testing';

import { Note } from '@no-paper-needed/shared/interfaces';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  const mockNote: Note = {
    id: '1',
    date: new Date(),
    content: 'Test note',
    reminderDaysBefore: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add note dialog', () => {
    it('should open add note dialog', () => {
      service.openAddNoteDialog();

      expect(service.isAddNoteDialogOpen()).toBe(true);
    });

    it('should close add note dialog', () => {
      service.openAddNoteDialog();
      service.closeAddNoteDialog();

      expect(service.isAddNoteDialogOpen()).toBe(false);
    });
  });

  describe('edit note dialog', () => {
    it('should open edit note dialog', () => {
      service.openEditNoteDialog(mockNote);

      expect(service.isEditNoteDialogOpen()).toBe(true);
    });

    it('should set edited note when opening', () => {
      service.openEditNoteDialog(mockNote);

      expect(service.editedNote()).toEqual(mockNote);
    });

    it('should close edit note dialog', () => {
      service.openEditNoteDialog(mockNote);
      service.closeEditNoteDialog();

      expect(service.isEditNoteDialogOpen()).toBe(false);
    });

    it('should clear edited note when closing', () => {
      service.openEditNoteDialog(mockNote);
      service.closeEditNoteDialog();

      expect(service.editedNote()).toBeUndefined();
    });
  });
});
