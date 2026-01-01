import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('PageNotFoundComponent INIT');
  }
}
