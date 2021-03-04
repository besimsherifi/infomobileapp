import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { LocationService } from '../../services/location.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  router: any;
  constructor(
    private locService: LocationService,
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  searchTextt;
  SortbyParam = '';
  SortDirection = 'asc';

  allproducts: any = [];
  companies: any = [];
  // private API_URL = 'https://develop.conome.mk/api';
   imgpath = 'https://develop.conome.mk/ProductsImages/';
  // imgpath = 'https://develop.conome.mkProductsImages/';
  // slider rangekm

    value = JSON.parse(localStorage.getItem('value'));
    options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 35, legend: 'km' },
      { value: 80, legend: 'km' },
      { value: 120, legend: 'km' },
      { value: 200, legend: 'km' },
    ],
  };
  detectchange(value) {
    this.findMe();
    if(localStorage.getItem('value') == null) {
      this.value = 35;
      localStorage.setItem('value', JSON.stringify(this.value))
    }
    else {
      localStorage.setItem('value', JSON.stringify(value))
    }
  }
  ngOnInit() {
    this.searchService.searchTextt.subscribe((val) => {
      this.searchTextt = val;
    });
    this.getLoc();
    this.findMe();
    this.detectchange(this.value);
  }
  getLoc() {
    this.locService.getLocation().then((resp) => {
      console.log(resp.lng);
      console.log(resp.lat);
    });
  }
  findMe() {
    //  let decodedData;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          radius: this.value * 1000,
        };
        this.dataService.getCrmCompaniesByUserAddress(data).subscribe(
          (formated) => {
            this.companies = formated.map((c) => {
              return {
                company: {
                  name: c.nameSQ,
                  id: c.id,
                },
                address: c.addresses.map((a) => {
                  return {
                    location: a.location,
                  };
                })[0],
                products: c.products,
              };
            });
            this.allproducts = [];
            for (let i = 0; i < this.companies.length; i++) {
              for (let j = 0; j < this.companies[i].products.length; j++) {
                this.allproducts.push(this.companies[i].products[j]);
              }
            }
            console.log(this.companies, 'Company');
          },
          (error) => {}
        );
      });
    } else {
    }
  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
