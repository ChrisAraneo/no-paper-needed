import { TestBed } from '@angular/core/testing';
import { NoteRecord } from '@no-paper-needed/interfaces';
import { of } from 'rxjs';

import { StoreService } from '../store/store.service';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let service: ExportService;
  let storeServiceSpy: { exportData: ReturnType<typeof vi.fn> };

  const mockRecords: NoteRecord[] = [
    {
      id: '1',
      date: '2025-06-15',
      content: 'Test note',
      reminderDaysBefore: 0,
    },
  ];

  beforeEach(() => {
    storeServiceSpy = { exportData: vi.fn().mockReturnValue(of(mockRecords)) };

    TestBed.configureTestingModule({
      providers: [{ provide: StoreService, useValue: storeServiceSpy }],
    });

    service = TestBed.inject(ExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger a file download with JSON content', () => {
    const clickSpy = vi.fn();
    const fakeAnchor = { click: clickSpy, href: '', download: '' };
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    (
      vi.spyOn(document, 'createElement') as unknown as ReturnType<typeof vi.fn>
    ).mockReturnValue(fakeAnchor);

    service.exportToFile();

    expect(storeServiceSpy.exportData).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');
  });
});
