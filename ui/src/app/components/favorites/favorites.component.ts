import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  searchTextt;
  data: any;
  imgpath = 'https://develop.conome.mk/ProductsImages/';
  // imgpath = 'https://develop.conome.mkProductsImages/';
  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('fav'));
    this.searchService.searchTextt.subscribe((val) => {
      this.searchTextt = val;
    });
  }
}
