import { Component, EventEmitter, Output } from '@angular/core';
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
}
