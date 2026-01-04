import { Component, inject, OnInit } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ElectronService } from './core/services';
import { AddNoteDialogComponent } from './shared/components/add-note-dialog/add-note-dialog.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SearchbarComponent,
    SidebarComponent,
    AddNoteDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected isAddNoteDialogVisible = false;

  private readonly electronService = inject(ElectronService);
  private readonly translate = inject(TranslateService);
  private readonly locale = inject(LOCALE_ID);

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const locale = urlParams.get('locale');

    this.translate.setFallbackLang('en');
    this.translate.use(locale ?? this.locale);

    console.log('Current locale:', locale ?? this.locale);

    if (this.electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    setTimeout(() => {
      this.isAddNoteDialogVisible = true;
    }, 2000);
  }
}
