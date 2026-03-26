import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ElectronService } from './core/services';
import { DialogService } from './core/services/dialog/dialog.service';
import { ExportService } from './core/services/export/export.service';
import { ImportService } from './core/services/import/import.service';
import { LocaleService } from '@no-paper-needed/shared/locale';
import { DialogContainerComponent } from './dialogs/dialog-container/dialog-container.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { FALLBACK_LOCALE } from '@no-paper-needed/shared/interfaces';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToolbarComponent,
    FooterComponent,
    DialogContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly dialogService = inject(DialogService);

  private readonly localeService = inject(LocaleService);
  private readonly electronService = inject(ElectronService);
  private readonly exportService = inject(ExportService);
  private readonly importService = inject(ImportService);
  private readonly translate = inject(TranslateService);

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

  openAddNoteDialog(): void {
    this.dialogService.openAddNoteDialog();
  }

  exportData(): void {
    this.exportService.exportToFile();
  }

  importData(): void {
    this.importService.importFromFile();
  }
}
