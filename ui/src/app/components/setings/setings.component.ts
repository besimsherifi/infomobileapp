import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-setings',
  templateUrl: './setings.component.html',
  styleUrls: ['./setings.component.css'],
})
export class SetingsComponent implements OnInit {
  constructor(
    private lokacioni: Location,
    private searchService: SearchService) {}

  backClicked() {
    this.lokacioni.back();
  }

  data: any;
  imgpath = 'https://my.conome.mk/ProductsImages/';
  selectedLanguage = "";

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('fav'));
    this.searchService.selectedLanguage.subscribe((val) => { 
      this.selectedLanguage = val; 
    });
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
  }
}
