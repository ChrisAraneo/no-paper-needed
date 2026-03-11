import { Component, input, OnChanges, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'npn-searchbar',
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss',
})
export class SearchbarComponent implements OnChanges {
  readonly value = input('');
  readonly search = output<string>();

  protected model = '';

  ngOnChanges(): void {
    this.model = this.value();
  }
}
