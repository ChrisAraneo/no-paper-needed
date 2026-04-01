import { inject, Injectable } from '@angular/core';
import { tap, first } from 'rxjs';

import { NoteRecord } from '@no-paper-needed/interfaces';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly storeService = inject(StoreService);

  exportToFile(): void {
    this.storeService
      .exportData()
      .pipe(
        first(),
        tap((records) => this.downloadJson(records)),
      )
      .subscribe();
  }

  private downloadJson(records: NoteRecord[]): void {
    const json = JSON.stringify(records, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `no-paper-needed-export-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();

    // TODO Removing url and anchor element after download?

    URL.revokeObjectURL(url);
  }
}
