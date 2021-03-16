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
  data: any;
  imgpath = 'https://localhost:44364/ProductsImages/';

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('fav') == null) {
      // Swal.fire({
      //   text: 'Favorite product not found',
      //   icon: 'warning',
      //   confirmButtonText: 'Ok!',
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.router.navigate(['/']);
      //   }
      // });

      document.getElementById("demo").innerHTML = '<img style="width:50%" src="../../assets/images/favorite.png" >'
    } else if (localStorage.getItem('fav') == '[]') {
      // Swal.fire({
      //   text: 'Favorite product not found',
      //   icon: 'warning',
      //   confirmButtonText: 'Ok!',
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.router.navigate(['/']);
      //   }
      // });
      document.getElementById("demo").innerHTML = '<img style="width:50%" src="../../assets/images/favorite.png" >'
    } else {
      this.data = JSON.parse(localStorage.getItem('fav'));
      this.searchService.searchTextt.subscribe((val) => {
        this.searchTextt = val;
      });
    }
  }
}
