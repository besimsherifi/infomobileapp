import { Component, ElementRef, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../../data.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Location } from '@angular/common';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-companydetails',
  templateUrl: './companydetails.component.html',
  styleUrls: ['./companydetails.component.css'],
})
export class CompanydetailsComponent implements OnInit {
  company: any = [];
  imgpath = 'link';
  imgpathi = 'linkProductsImages/';

  id;
  public data: any;
  allproducts: any = [];
  companies: any = [];
  prodcom: any = [];
  selectedLanguage;
  constructor(
    public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private searchService: SearchService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async ngOnInit() {
    await this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = +params.get('id');
          return this.getCompany(+params.get('id'));
        })
      )
      .subscribe(
        (data) => {
          this.company = data;
        },
        (error) => {
          console.log(error);
        }
      );
    this.findMe(this.id);
    this.searchService.selectedLanguage.subscribe((val) => { 
      this.selectedLanguage = val; 
    });
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
  }

  getCompany(id) {
    return this.dataservice.getcompaniesbyID(id);
  }

  findMe(id) {
    this.dataservice.getcompaniesbyID(id).subscribe(
      (formated) => {
        this.prodcom = formated.map((c) => {
          return {
            company: {
              name: c.nameSQ,
              nameMK: c.nameMK,
              id: c.id,
            },
            products: c.productsi,
          };
        });
        this.allproducts = [];
        for (let i = 0; i < this.prodcom.length; i++) {
          for (let j = 0; j < this.prodcom[i].products.length; j++) {
            this.allproducts.push(this.prodcom[i].products[j]);
          }
        }
        console.log(this.prodcom, 'Company');

      },
      (error) => {}
    );
  }


  backClicked() {
    this.location.back();
  }
}
