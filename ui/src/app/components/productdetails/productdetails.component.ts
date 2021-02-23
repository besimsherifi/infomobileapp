import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
@Injectable()
export class ProductdetailsComponent implements OnInit {
  products: any = [];
  imgpath = 'https://localhost:44364/ProductsImages/';
  id;
  isFavorite: boolean = false;
  public data: any;

  allproducts: any = [];



  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageMap

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  // tslint:disable-next-line:typedef
 async ngOnInit() {
    await this.route.paramMap
      .pipe(
        switchMap(params => {this.id = +params.get('id');

                             return this.getProduct(+params.get('id'));
        }
        ))
      .subscribe((data) => {
        this.products = data,
        console.log(data, 'Produkteteeeeee');
                            if (this.products.length < 1) {
                              this.id--;
                              if (this.id === 0) {
                                this.id = 2;
                              }
                              this.router.navigate(['/detail', this.id]);

                            }
                            this.isprodfav();
      },
    (error) => {
      console.log(error);

    });


    this.dataservice.getProducts().subscribe((formated) => {
      this.allproducts = formated

    }

    );

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

async  AddToFav(){
    let products  = JSON.parse(localStorage.getItem('fav'))
    if(products != null){
      let item = products.find(x => x.id === this.products[0].id)
      if(item != null){
        if( this.isFavorite = true){
          this.isFavorite = false
          const index = products.indexOf(item);
          products.splice(index, 1)
          localStorage.setItem('fav', JSON.stringify(products))
        }else{
          this.isFavorite = true
        }

      }else{
        products.push(this.products[0])
        this.isFavorite = true
        localStorage.setItem('fav', JSON.stringify(products))
      }
    }else{

      this.isFavorite = true
      localStorage.setItem('fav', JSON.stringify(this.products))
    }
  }


isprodfav(){
  const products = JSON.parse(localStorage.getItem('fav')).find(x => x.id === this.products[0].id);
  if (products !== null){
    if (products.id === this.products[0].id){
      this.isFavorite = true;
      }else{
        this.isFavorite = false
      }
    }

}


  }


