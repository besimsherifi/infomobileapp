import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css']
})
export class CompanydetailsComponent implements OnInit {
  company: any = [];
  // imgpath = 'http://88.99.184.172:82/ProductsImages/';
  imgpath = 'https://localhost:44364/';
  id;
  public data: any;
  companies: any = [];
  value: number = 25;
  constructor(public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

    ngOnInit() {
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }
  getProduct(id) {
    this.dataservice.getcompaniesbyID(id).subscribe(
      (data) => {
        this.companies = data;
        console.log(data, 'curentproduct');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

}
