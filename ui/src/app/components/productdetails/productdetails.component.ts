import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  products: any = [];
  imgpath = 'https://localhost:44364/ProductsImages/';
  id;

  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {this.id = +params.get('id');

                             return this.getProduct(+params.get('id'));
        }
        ))
      .subscribe((data) => {this.products = data,

        console.log(data, 'Produkteteeeeee');
                            if (this.products.length < 1) {
                              this.router.navigate(['/detail', this.id - 1]);
                             }
      },
    (error) => {
      console.log(error);
    });
  }


  // tslint:disable-next-line:typedef



  // tslint:disable-next-line:typedef
  getProduct(id) {
  return this.dataservice.getProductsbyID(id);
  }



  // tslint:disable-next-line:typedef
  goNext(){

    console.log(this.id , 'ProoddddIDD');
    this.router.navigate(['/detail', this.id + 1]);

  }

}
