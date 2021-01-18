import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { LocationService } from 'src/app/services/location.service';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {router: any;
  constructor(private locService: LocationService, private dataService: DataService ) {}


  imgpath = 'https://localhost:44364/ProductsImages/';
  companies: any = [];

// slider rangekm
  // tslint:disable-next-line:no-inferrable-types
  value: number = 25;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 25, legend: 'km' },
      { value: 50, legend: 'km' },
      { value: 75, legend: 'km' },
      { value: 200, legend: 'km' }
    ]
  };

  // tslint:disable-next-line:typedef
  detectchange(value){
    this.findMe();
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getLoc();
    this.findMe();
  }


  // tslint:disable-next-line:typedef
  getLoc(){
    this.locService.getLocation().then(resp => {
      console.log(resp.lng);
      console.log(resp.lat);
    });
  }

    // tslint:disable-next-line:typedef
    findMe()
    {
     let decodedData;

     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition((position) => {
         const data = {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           radius: this.value * 1000
         };
        this.dataService.getCrmCompaniesByUserAddress(data)
         .subscribe((formated) => {
          this.companies = formated.map((c) => {
            return {
              company: {
                name: c.nameSQ,
                id: c.id
              },
              address: c.addresses.map((a) => {
                  return {
                    location: a.location
                  };
                })[0],
              products: c.products
            };
            });
          console.log(this.companies, 'Company');
      }, (error) => {
        });

     });
   }
     else {
     }
   }

}


