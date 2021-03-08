import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private lokacioni: Location) {}

  ngOnInit(): void {}

  // tslint:disable-next-line:typedef
  backClicked() {
    this.lokacioni.back();
  }
}
