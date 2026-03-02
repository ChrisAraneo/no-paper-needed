import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-searchbar',
  imports: [IconFieldModule, InputIconModule, InputTextModule, FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent implements OnChanges {
  @Input() value = '';
  @Output() readonly search = new EventEmitter<string>();

  protected model = '';

  ngOnChanges(): void {
    this.model = this.value;
  }
}
