import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  products: any = [];
  imgpath = 'https://localhost:44364/ProductsImages/';
  id;
  isFavorite: false;
  public data: any;



  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService

  ) {

  }

  // tslint:disable-next-line:typedef
 async ngOnInit() {
    await this.route.paramMap
      .pipe(
        switchMap(params => {this.id = +params.get('id');

                             return this.getProduct(+params.get('id'));
        }
        ))
      .subscribe((data) => {this.products = data,
        console.log(data, 'Produkteteeeeee');


        // this.isprodfav();
                            if (this.products.length < 1) {
                              this.id--;
                              if (this.id === 0) {
                                this.id = 2;
                              }
                              this.router.navigate(['/detail', this.id]);

                            }


      },
    (error) => {
      console.log(error);
    });


  }


  getProduct(id) {
  return this.dataservice.getProductsbyID(id);
  }





  goNext(){
    console.log(this.id , 'ProoddddIDD');
    this.router.navigate(['/detail', this.id + 1]);

  }


  goBack() {
    this.id--;
    if (this.id === 0) {
     this.id = 1;
   }

    this.router.navigate(['/detail', this.id]);
  }

  AddToFav() {
    if (this.isFavorite) {
    localStorage.setItem('fav', JSON.stringify(this.products));
    console.log(this.data);

    }
    else if (this.isFavorite === false) {
      localStorage.removeItem('fav');
    }


  }

  // tslint:disable-next-line:typedef
  // isprodfav(){
  //   const product = JSON.parse(localStorage.getItem('fav'));
  //   console.log(product, 'STORAGEEE');
  //   // tslint:disable-next-line:label-position
  //   if (product !== null){
  //     if (product[0].id === this.products[0].id){
  //       this.isFavorite = true;
  //       }
  //   }
  // }

}
