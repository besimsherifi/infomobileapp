import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';
import * as geolib from 'geolib';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  searchTextt;
  router: any;
  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) {}
  compani: any = [];
  // imgpath = 'https://localhost:44364/';
  imgpath = 'https://develop.conome.mk/';
  companies: any = [];
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
    this.findMe();
    this.detectchange(this.value);
  }
  findMe() {
    let decodedData;
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.getCrmCompaniesByUserAddress().subscribe(
          (formated) => {
            this.companies = formated;
            this.compani = [];
            this.companies.forEach(formate => {
              const latitudee =  formate.lat;
              const longitudee =  formate.lon;
                const radius = this.value * 1000;
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                var geolibi = geolib.isPointWithinRadius(
                  { latitude: latitude, longitude: longitude },
                  { latitude: latitudee, longitude: longitudee },
                  radius //meters
                );
                if(geolibi){
                this.compani.push(formate)
            }

          });
            console.log(this.companies, 'Companya');
          },
          (error) => {}
        );
      });
    }
}
