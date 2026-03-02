import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ButtonComponent } from '../shared/components/button/button.component';
import { SearchbarComponent } from '../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'app-toolbar',
  imports: [SearchbarComponent, ButtonComponent, TranslatePipe, AsyncPipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() readonly addNote = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly searchQuery$ = this.route.queryParams.pipe(
    map((params) => (params['q'] as string) ?? ''),
  );

  private get baseRoute(): string {
    return this.router.url.startsWith('/archive') ? '/archive' : '/home';
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToArchive(): void {
    this.router.navigate(['/archive']);
  }

  navigateToSearch(query: string): void {
    if (!query) {
      this.router.navigate([this.baseRoute]);

      return;
    }

    this.router.navigate([this.baseRoute, 'search'], { queryParams: { q: query } });
  }
}
