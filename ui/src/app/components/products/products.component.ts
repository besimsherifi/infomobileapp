import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';
import * as geolib from 'geolib';
import {  Plugins, GeolocationPosition } from '@capacitor/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  router: any;
  constructor(
    private dataService: DataService,
    private searchService: SearchService,
    private spinner: NgxSpinnerService
  ) {}
  loc: GeolocationPosition;
  waitingForCurrentPosition = false;
  searchTextt;
  SortbyParam = '';
  SortDirection = 'asc';
  allproducts: any = [];
  products: any = [];
  selectedLanguage = ""
  imgpath = 'linkProductsImages/';
    value = JSON.parse(localStorage.getItem('value'));
    options: Options = {

    stepsArray: [
      { value: 35 },
      { value: 80 },
      { value: 120 },
      { value: 200 },
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
    this.searchService.selectedLanguage.subscribe((val) => { 
      this.selectedLanguage = val; 
    });
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
    console.log(this.selectedLanguage)
    this.spinner.show();
    this.findMe();
    this.detectchange(this.value);
  }
 async findMe() {
  try {
    const { Geolocation } = Plugins;
       this.loc = await Geolocation.getCurrentPosition();
       var latitude = this.loc.coords.latitude;
       var longitude = this.loc.coords.longitude}
       catch (err) {
        this.spinner.hide();
       Swal.fire({
              text: 'Please enable location',
              icon: 'warning',
              confirmButtonText: 'Enable Location',
            }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
              }
            });
      } finally {
        this.waitingForCurrentPosition = false;
      }
        this.dataService.getAllProducts().subscribe(
          (formated) => {
            this.products = formated;
            this.allproducts = [];
            console.log(this.products,'produktet')
            console.log(this.allproducts,'allproducts')
            this.products.forEach(formate => {
                const latitudee =  formate.lat;
                const longitudee =  formate.lon;
                const radius = this.value * 1000;

                var geolibi = geolib.isPointWithinRadius(
                  { latitude: latitude, longitude: longitude },
                  { latitude: latitudee, longitude: longitudee },
                  radius //meters
                );
                if(geolibi){
                this.allproducts.push(formate);
                this.spinner.hide();
            }

          });
          },
          (error) => {}
        );

  }
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
