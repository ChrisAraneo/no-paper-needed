import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/* eslint-disable @angular-eslint/no-output-native */

@Component({
  selector: 'npn-search',
  imports: [TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() readonly search = new EventEmitter<string>();

  onSearch(element: HTMLInputElement, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    this.search.emit(element.value.trim());
    element.value = '';
  }
}
