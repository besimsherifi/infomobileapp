
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
  imgpathi = 'https://localhost:44364/ProductsImages/';
  
  id;
  public data: any;
  allproducts: any = [];
  companies: any = [];
  prodcom: any = [];
  constructor(public dataservice: DataService,
    private route: ActivatedRoute,
    private router: Router
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
          (this.company = data), console.log(data, 'Company');
          if (this.company.length < 1) {
            this.id--;
            if (this.id === 0) {
              this.id = 2;
            }
            this.router.navigate(['/detail', this.id]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.findMe(this.id);

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
                  id: c.id,
                },
              
                productsi: c.productsi,
              };
            });
            this.allproducts = [];
            for (let i = 0; i < this.prodcom.length; i++) {
              for (let j = 0; j < this.prodcom[i].productsi.length; j++) {
                this.allproducts.push(this.prodcom[i].productsi[j]);
              }
            }
            console.log(this.prodcom, 'Company');
          },
          (error) => {}
        );
      }
    }
  
  
