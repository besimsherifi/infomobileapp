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
  allproducts: any = [];
  companies: any = [];
  imgpath = 'https://localhost:44364/ProductsImages/';
  // slider rangekm

  value: number = 25;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 40, legend: 'km' },
      { value: 80, legend: 'km' },
      { value: 120, legend: 'km' },
      { value: 200, legend: 'km' },
    ],
  };
  detectchange(value) {
    this.findMe();
  }
  ngOnInit() {
    this.searchService.searchTextt.subscribe((val) => {
      this.searchTextt = val;
    });
    this.getLoc();
    this.findMe();
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
            console.log(this.allproducts, 'proooo');
            console.log(this.companies, 'Produktet');
          },
          (error) => {}
        );
      });
    } else {
    }
  }
}
