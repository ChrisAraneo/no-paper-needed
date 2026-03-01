import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StoreService } from '../core/services';
import { NoteComponent } from '../shared/components/note/note.component';
import { TodayComponent } from '../shared/components/today/today.component';

@Component({
  selector: 'app-archive',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    TodayComponent,
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
})
export class ArchiveComponent {
  private readonly storeService = inject(StoreService);

  protected outdatedNotes = this.storeService.getOutdatedNoteTableForDate(
    new Date(),
  );
}
