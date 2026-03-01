import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { ButtonComponent } from '../shared/components/button/button.component';
import { SearchbarComponent } from '../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'app-toolbar',
  imports: [SearchbarComponent, ButtonComponent, TranslatePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() readonly addNote = new EventEmitter<void>();

  private readonly router = inject(Router);

  navigateToHome(): void {
    this.router.navigate(['/home'], { queryParamsHandling: 'preserve' });
  }

  navigateToArchive(): void {
    this.router.navigate(['/archive'], { queryParamsHandling: 'preserve' });
  }
}
