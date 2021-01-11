import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {  router: any;
  constructor(private locService: LocationService, private dataService: DataService ) {}


  companies: any = [];


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
           longitude: position.coords.longitude
         };
         this.locService.decodeAdress(data)
         .toPromise().then((decoded) => {
           decodedData = decoded[0];
       }).then(() => {
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
          console.log(this.companies, 'Produktet');
         }, (error) => {
        });
      });
     });
   }
     else {
     }
   }
}


