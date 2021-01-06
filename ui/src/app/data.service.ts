import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private router: Router) { }


  getCrmCompaniesByUserAddress(data): Observable<any>{
    // console.log(data, 'data');
    return this.http.post('http://localhost:8000/api/crm/c', data);
    }
}
