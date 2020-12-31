import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.css']
})
export class UserlocationComponent implements OnInit {
  router: any;
  constructor(private locService: LocationService) {}



  ngOnInit() {
    // this.getdashProduct();
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
           console.log(decoded, 'DECODED');
           decodedData = decoded[0];

       })
     });
   }
     else {

     }
   }




}
