import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ElectronService } from './core/services';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly electronService = inject(ElectronService);
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.setDefaultLang('en');

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
