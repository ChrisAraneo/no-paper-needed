import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, switchMap } from 'rxjs';

import { StoreService } from '../core/services';
import { NoteComponent } from '@no-paper-needed/components/note';
import { HeaderComponent } from '@no-paper-needed/components/header';
import { Note } from '@no-paper-needed/shared/interfaces';
import { TextComponent } from '@no-paper-needed/components/text';

@Component({
  selector: 'app-search',
  imports: [
    TranslateModule,
    NoteComponent,
    CommonModule,
    AsyncPipe,
    HeaderComponent,
    TextComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private readonly storeService = inject(StoreService);
  private readonly route = inject(ActivatedRoute);

  protected readonly query: Observable<string> = this.route.queryParams.pipe(
    map((params) => (params['q'] as string) ?? ''),
  );

  protected readonly notes: Observable<Note[][]> = this.route.queryParams.pipe(
    switchMap((params) =>
      this.storeService.searchNotes((params['q'] as string) ?? ''),
    ),
  );
}
