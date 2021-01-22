import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  products: any = [];
  imgpath = 'https://localhost:44364/ProductsImages/';
  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }
  // tslint:disable-next-line:typedef
  getProduct(id) {
    this.dataservice.getProductsbyID(id).subscribe(
      (data) => {
        this.products = data;
        console.log(data, 'curentproduct');
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
