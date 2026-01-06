import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { StoreService } from '../core/services';
import { NoteComponent } from '../shared/components/note/note.component';
import { Note } from '../shared/interfaces/note.interface';

@Component({
  selector: 'app-home',
  imports: [TranslateModule, NoteComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly storeService = inject(StoreService);
  protected notes: Note[] = [];

  ngOnInit(): void {
    this.storeService.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }
}
