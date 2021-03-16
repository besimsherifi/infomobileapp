import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
@Injectable()
export class ProductdetailsComponent implements OnInit {
  products: any = [];
  imgpath = 'https://develop.conome.mk/ProductsImages/';
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

  async ngOnInit() {
    await this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = +params.get('id');
          return this.getProduct(+params.get('id'));
        })
      )
      .subscribe(
        (data) => {
          (this.products = data), console.log(data, 'Produkteteeeeee');
          this.isprodfav();
        },
        (error) => {
          console.log(error);
        }
      );

    this.dataservice.getProducts().subscribe((formated) => {
      this.allproducts = formated;
      console.log(this.allproducts);
    });
  }

  getProduct(id) {
    return this.dataservice.getProductsbyID(id);
  }

  goNext() {
    let item = this.allproducts.find((x) => x.id === this.products[0].id);
    let index = this.allproducts.indexOf(item);
    if (index === this.allproducts.length - 1) {
      this.router.navigate(['/productdetail', this.allproducts[0].id]);
    } else {
      let newindex = index + 1;
      console.log(newindex, 'prodi');
      let newprod = this.allproducts[newindex];
      this.router.navigate(['/productdetail', newprod.id]);
    }
  }

  goBack() {
    let item = this.allproducts.find((x) => x.id === this.products[0].id);

    let index = this.allproducts.indexOf(item);

    if (index === 0) {
      let lastitem = this.allproducts[this.allproducts.length - 1];
      this.router.navigate(['/productdetail', lastitem.id]);
    } else {
      let newindex = index - 1;

      console.log(newindex, 'prodi');
      let newprod = this.allproducts[newindex];
      console.log(newprod);

      this.router.navigate(['/productdetail', newprod.id]);
    }
  }

  async AddToFav() {
    let products = JSON.parse(localStorage.getItem('fav'));
    if (products != null) {
      let item = products.find((x) => x.id === this.products[0].id);
      if (item != null) {
        if ((this.isFavorite = true)) {
          this.isFavorite = false;
          const index = products.indexOf(item);
          products.splice(index, 1);
          localStorage.setItem('fav', JSON.stringify(products));
        } else {
          this.isFavorite = true;
        }
      } else {
        products.push(this.products[0]);
        this.isFavorite = true;
        localStorage.setItem('fav', JSON.stringify(products));
      }
    } else {
      this.isFavorite = true;
      localStorage.setItem('fav', JSON.stringify(this.products));
    }
  }

  isprodfav() {
    const products = JSON.parse(localStorage.getItem('fav')).find(
      (x) => x.id === this.products[0].id
    );
    if (products !== null) {
      if (products.id === this.products[0].id) {
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    } else {
      console.log('favorite not found');
    }
  }
}
