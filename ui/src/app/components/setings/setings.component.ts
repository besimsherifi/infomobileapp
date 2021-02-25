import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-setings',
  templateUrl: './setings.component.html',
  styleUrls: ['./setings.component.css'],
})
export class SetingsComponent implements OnInit {
  constructor(
    private lokacioni: Location
  ) {}

  // tslint:disable-next-line:typedef
  backClicked() {
    this.lokacioni.back();
  }

  data: any;
  // imgpath = 'http://88.99.184.172:82/ProductsImages/';
  imgpath = 'https://localhost:44364/ProductsImages/';

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('fav'));
  }
}
