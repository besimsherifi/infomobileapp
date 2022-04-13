import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';
import * as geolib from 'geolib';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  searchTextt;
  selectedLanguage: String;
  router: any;
  constructor(
    private dataService: DataService,
    private searchService: SearchService,
    private spinner: NgxSpinnerService
  ) {}
  compani: any = [];
  // imgpath = 'link';
  imgpath = 'link';
  companies: any = [];
  // slider rangekm
  value = JSON.parse(localStorage.getItem('value'));
  options: Options = {

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
    this.searchService.selectedLanguage.subscribe((val) => { 
      this.selectedLanguage = val; 
    });
    if(localStorage.getItem('selectedLanguage') == null) {
      this.selectedLanguage = 'al';
    }else {
      this.selectedLanguage = localStorage.getItem('selectedLanguage');
    }
    this.spinner.show();
    this.findMe();
    this.detectchange(this.value);
  }
  findMe() {
    let decodedData;
      navigator.geolocation.getCurrentPosition((position) => {
        this.dataService.getCrmCompaniesByUserAddress().subscribe(
          (formated) => {
            this.companies = formated;
         console.log(this.companies,'COM')
        //  console.log(formated)
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
                this.compani.push(formate);
                this.spinner.hide();
            }

          });
            
          },
          (error) => {}
        );
      });
    }
}
