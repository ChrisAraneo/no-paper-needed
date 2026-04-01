import { TestBed } from '@angular/core/testing';
import { NoteRecord } from '@no-paper-needed/interfaces';
import { of } from 'rxjs';

import { StoreService } from '../store/store.service';
import { ImportService } from './import.service';

describe('ImportService', () => {
  let service: ImportService;
  let storeServiceSpy: { importData: ReturnType<typeof vi.fn> };

  const mockRecords: NoteRecord[] = [
    {
      id: '1',
      date: '2025-06-15',
      content: 'Test note',
      reminderDaysBefore: 0,
    },
  ];

  beforeEach(() => {
    storeServiceSpy = { importData: vi.fn().mockReturnValue(of(void 0)) };

    TestBed.configureTestingModule({
      providers: [{ provide: StoreService, useValue: storeServiceSpy }],
    });

    service = TestBed.inject(ImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a file picker on importFromFile', () => {
    const clickSpy = vi.fn();
    const addEventListenerSpy = vi.fn();
    const fakeInput = {
      type: '',
      accept: '',
      files: null,
      click: clickSpy,
      addEventListener: addEventListenerSpy,
    };

    (
      vi.spyOn(document, 'createElement') as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(fakeInput);

    service.importFromFile();

    expect(fakeInput.type).toBe('file');
    expect(fakeInput.accept).toBe('.json');
    expect(clickSpy).toHaveBeenCalled();
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('should parse file and call importData on store', () => {
    const addEventListenerSpy = vi.fn();
    const fakeInput = {
      type: '',
      accept: '',
      files: null as FileList | null,
      click: vi.fn(),
      addEventListener: addEventListenerSpy,
    };

    (
      vi.spyOn(document, 'createElement') as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(fakeInput);

    service.importFromFile();

    const changeHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'change',
    )![1] as () => void;

    const json = JSON.stringify(mockRecords);
    const fakeFile = new File([json], 'export.json', {
      type: 'application/json',
    });
    fakeInput.files = [fakeFile] as unknown as FileList;

    const readerAddEventListenerSpy = vi.spyOn(
      FileReader.prototype,
      'addEventListener',
    );
    vi.spyOn(FileReader.prototype, 'readAsText').mockImplementation(function (
      this: FileReader,
    ) {
      Object.defineProperty(this, 'result', { value: json, writable: false });
      const loadHandler = readerAddEventListenerSpy.mock.calls.find(
        ([event]) => event === 'load',
      )![1] as () => void;
      loadHandler.call(this);
    });

    changeHandler();

    expect(storeServiceSpy.importData).toHaveBeenCalledWith(mockRecords);
  });

  it('should not call importData when no file is selected', () => {
    const addEventListenerSpy = vi.fn();
    const fakeInput = {
      type: '',
      accept: '',
      files: [] as unknown as FileList,
      click: vi.fn(),
      addEventListener: addEventListenerSpy,
    };

    (
      vi.spyOn(document, 'createElement') as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(fakeInput);

    service.importFromFile();

    const changeHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'change',
    )![1] as () => void;

    fakeInput.files = { length: 0 } as FileList;
    changeHandler();

    expect(storeServiceSpy.importData).not.toHaveBeenCalled();
  });
});
