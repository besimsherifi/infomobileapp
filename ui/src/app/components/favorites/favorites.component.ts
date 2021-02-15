import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],

})
export class FavoritesComponent implements OnInit {

  data: any;
  constructor(

  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('fav'));
    console.log(this.data);

}

  }
//   // tslint:disable-next-line:typedef
//   updateValue() {
//     this.prod.push('checked');
//     this.prod = this.prod; // does the trick
// }
  // tslint:disable-next-line:typedef





