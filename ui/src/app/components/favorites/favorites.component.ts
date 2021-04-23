import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from 'src/app/search.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  searchTextt;
  selectedLanguage = "";
  data: any;
  imgpath = 'https://my.conome.mk/ProductsImages/';

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchService.selectedLanguage.subscribe((val) => { 
      this.selectedLanguage = val; 
    });
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
    if (localStorage.getItem('fav') == null) {
      Swal.fire({
        text: 'Favorite product not found',
        icon: 'warning',
        confirmButtonText: 'Ok!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });


    } else if (localStorage.getItem('fav') == '[]') {
      Swal.fire({
        text: 'Favorite product not found',
        icon: 'warning',
        confirmButtonText: 'Ok!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      });

    } else {
      this.data = JSON.parse(localStorage.getItem('fav'));
      this.searchService.searchTextt.subscribe((val) => {
        this.searchTextt = val;
      });
    }
  }
}
