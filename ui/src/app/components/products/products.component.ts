import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { LocationService } from '../../services/location.service';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {  router: any;
  constructor(private locService: LocationService, private dataService: DataService ) {}
  allproducts: any = [];
  companies: any = [];
   imgpath = 'https://localhost:44364/ProductsImages/';
// slider rangekm
  // tslint:disable-next-line:no-inferrable-types
  value: number = 25;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 40, legend: 'km' },
      { value: 80, legend: 'km' },
      { value: 120, legend: 'km' },
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
    //  let decodedData;
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
          this.allproducts = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.companies.length;  i++) {
            // tslint:disable-next-line:prefer-for-of
            for ( let j = 0; j < this.companies[i].products.length ; j++) {
              this.allproducts.push(this.companies[i].products[j]);
            }
          }
          console.log(this.allproducts, 'proooo');
          console.log(this.companies, 'Produktet');
      }, (error) => {
        });
     });
   }
     else {
     }
   }
}




