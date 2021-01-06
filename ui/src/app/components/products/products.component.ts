import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {  router: any;
  constructor(private locService: LocationService,private dataService: DataService ) {}


  produkti: any = [];


  ngOnInit() {
    this.getLoc();
    this.findMe();
  }


  getLoc(){
    this.locService.getLocation().then(resp => {
      console.log(resp.lng);
      console.log(resp.lat);
    });
  }

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
         .subscribe((formated) =>{
           this.produkti = formated.map((c)=>{

             return { nameprod: c.products[0].nameSQ,price: c.products[0].sellingPriceWithVat,adresa: c.addresses[0].location }

           });
           console.log(this.produkti,"Produktet")
          ;
         }, (error) => {
        });
      });
     });
   }
     else {
     }
   }
}
