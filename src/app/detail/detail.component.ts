import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-detail',
  imports: [RouterLink, TranslateModule],
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('DetailComponent INIT');
  }
}
