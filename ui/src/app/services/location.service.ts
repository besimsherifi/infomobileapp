import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient, private router: Router) {}

  getLocation(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        reject('Error');
      });
    });
  }

  decodeAdress(data){
    return this.http.post('http://localhost:8000/api/user/reverse', data);
  }

}
