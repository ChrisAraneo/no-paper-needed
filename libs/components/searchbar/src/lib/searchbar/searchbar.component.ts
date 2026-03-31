import { Component, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'npn-searchbar',
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  readonly value = input('');
  readonly placeholder = input('');

  readonly search = output<string>();

  protected model = linkedSignal(() => this.value());
}
