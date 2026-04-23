import { Component, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@no-paper-needed/components/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'npn-footer',
  imports: [ButtonComponent, TooltipModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly export = output();
  readonly import = output();
}
