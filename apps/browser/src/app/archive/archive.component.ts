import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StoreService } from '../core/services';
import { NoteComponent } from '@no-paper-needed/components/note';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { TextComponent } from '@no-paper-needed/components/text';

@Component({
  selector: 'app-archive',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    HeaderComponent,
    TextComponent,
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
