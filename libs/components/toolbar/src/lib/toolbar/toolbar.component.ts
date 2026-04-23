import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonComponent } from '@no-paper-needed/components/button';
import { SearchbarComponent } from '@no-paper-needed/components/searchbar';
import { LocaleService } from '@no-paper-needed/shared/locale';
import { map } from 'rxjs';

@Component({
  selector: 'npn-toolbar',
  imports: [AsyncPipe, ButtonComponent, SearchbarComponent, TranslatePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() readonly addNote = new EventEmitter<void>();

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly localeService = inject(LocaleService);

  protected readonly searchQuery$ = this.route.queryParams.pipe(
    map((params) => (params.q as string) ?? ''),
  );

  private get lang(): string {
    return this.localeService.getCurrentLang();
  }

  private get baseRoute(): string {
    const {lang} = this;

    return this.router.url.includes('/archive')
      ? `/${lang}/archive`
      : `/${lang}/home`;
  }

  navigateToHome(): void {
    this.router.navigate([`/${this.lang}/home`], {
      queryParamsHandling: 'merge',
    });
  }

  navigateToArchive(): void {
    this.router.navigate([`/${this.lang}/archive`], {
      queryParamsHandling: 'merge',
    });
  }

  navigateToSearch(query: string): void {
    if (!query) {
      this.router.navigate([this.baseRoute], { queryParamsHandling: 'merge' });

      return;
    }

    this.router.navigate([this.baseRoute, 'search'], {
      queryParams: { q: query },
      queryParamsHandling: 'merge',
    });
  }
}
