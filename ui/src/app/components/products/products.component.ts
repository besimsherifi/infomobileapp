import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';
import * as geolib from 'geolib';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  router: any;
  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) {}
  searchTextt;
  SortbyParam = '';
  SortDirection = 'asc';
  allproducts: any = [];
  products: any = [];
  imgpath = 'https://develop.conome.mk/ProductsImages/';
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
    this.findMe();
    this.detectchange(this.value);
  }
  findMe() {
    //  let decodedData;
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.getAllProducts().subscribe(
          (formated) => {
            this.products = formated;
            this.allproducts = [];
            this.products.forEach(formate => {

                const latitudee =  formate.addresses.latLng.lat;
                const longitudee =  formate.addresses.latLng.lng;
                const radius = this.value * 1000;
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var geolibi = geolib.isPointWithinRadius(
                  { latitude: latitude, longitude: longitude },
                  { latitude: latitudee, longitude: longitudee },
                  radius //meters
                );
                if(geolibi){
               console.log(geolibi, "geolibi")
                this.allproducts.push(formate)
            }

          });
            console.log(this.products, 'Company');
          },
          (error) => {}
        );
      });
  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
