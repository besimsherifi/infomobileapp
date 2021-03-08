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


  backClicked() {
    this.lokacioni.back();
  }

  data: any;
  imgpath = 'https://develop.conome.mk/ProductsImages/';


  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('fav'));
  }
}
