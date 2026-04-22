import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { NoteComponent } from '@no-paper-needed/components/note';
import { TextComponent } from '@no-paper-needed/components/text';

import { StoreService } from '../core/services';

@Component({
  selector: 'app-archive',
  imports: [
    AsyncPipe,
    CommonModule,
    HeaderComponent,
    NoteComponent,
    TextComponent,
    TranslateModule,
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
