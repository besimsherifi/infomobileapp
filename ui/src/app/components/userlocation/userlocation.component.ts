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


  products: any = [0];

  ngOnInit() {
    // this.getdashProduct();
    this.getLoc();
  }

  getLoc(){
    this.locService.getLocation().then(resp => {
      console.log(resp.lng);
      console.log(resp.lat);
    });
  }



}
