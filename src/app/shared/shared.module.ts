import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, TranslateModule, FormsModule],
  declarations: [],
  exports: [TranslateModule, FormsModule]
})
export class SharedModule {}
