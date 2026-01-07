import { Component, EventEmitter, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { SearchbarComponent } from '../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'app-toolbar',
  imports: [SearchbarComponent, ButtonModule, TranslatePipe],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Output() readonly addNote = new EventEmitter<void>();
}
