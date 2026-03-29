import { Component, output } from '@angular/core';
import { ButtonComponent } from '@no-paper-needed/shared/button';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'npn-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [ButtonComponent, TooltipModule, TranslateModule],
})
export class FooterComponent {
  readonly export = output<void>();
  readonly import = output<void>();
}
