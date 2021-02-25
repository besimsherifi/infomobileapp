import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { LocationService } from 'src/app/services/location.service';
import { Options } from '@angular-slider/ngx-slider';
import { SearchService } from '../../search.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  searchTextt;
  router: any;
  constructor(
    private locService: LocationService,
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  compani: any = [];
  // imgpath = 'http://88.99.184.172:82/';
  imgpath = 'https://localhost:44364/';
  companies: any = [];

  // slider rangekm
  value: number = 25;
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
    let decodedData;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          radius: this.value * 1000,
        };
        this.dataService.getCrmCompaniesByUserAddress(data).subscribe(
          (formated) => {
            this.companies = formated;

            console.log(this.companies, 'Companya');
          },
          (error) => {}
        );
      });
    } else {
    }
  }
}
