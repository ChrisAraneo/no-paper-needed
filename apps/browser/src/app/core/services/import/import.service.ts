import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';

import { NoteRecord } from '@no-paper-needed/shared/interfaces';
import { StoreService } from '../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class ImportService {
  private readonly storeService = inject(StoreService);

  importFromFile(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.addEventListener('change', () => {
      const file = input.files?.[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const records = JSON.parse(reader.result as string) as NoteRecord[];
        this.storeService.importData(records).pipe(first()).subscribe();
      });

      reader.readAsText(file);
    });

    input.click();
  }
}
