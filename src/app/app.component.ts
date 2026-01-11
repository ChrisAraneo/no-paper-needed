/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/member-ordering */

import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FALLBACK_LOCALE } from './app.consts';
import { ElectronService, StoreService } from './core/services';
import { LocaleService } from './core/services/locale/locale.service';
import { AddNoteDialogComponent } from './dialogs/add-note-dialog/add-note-dialog.component';
import { Note } from './shared/interfaces/note.interface';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddNoteDialogComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected isAddNoteDialogVisible = false;

  private readonly localeService = inject(LocaleService);
  private readonly electronService = inject(ElectronService);
  private readonly translate = inject(TranslateService);
  private readonly storeService = inject(StoreService);

  protected openAddNoteDialog(): void {
    this.isAddNoteDialogVisible = true;
  }

  protected closeAddNoteDialog(): void {
    this.isAddNoteDialogVisible = false;
  }

  protected onSaveNote(note: Note): void {
    this.storeService.addNote(note);
    this.closeAddNoteDialog();
  }

  ngOnInit(): void {
    this.translate.setFallbackLang(FALLBACK_LOCALE);

    this.localeService.get().subscribe((locale) => this.translate.use(locale));

    if (this.electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }
}
