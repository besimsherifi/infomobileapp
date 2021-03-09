import { ICompany } from './interfaces/ICompany';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) {}

  getCrmCompaniesByUserAddress(data): Observable<any> {
    // console.log(data, 'data');
    return this.http.post('http://localhost:8000/api/crm/c', data);
  }


  getcompaniesbyID(id): Observable<any> {
    return this.http.get<IProduct>(
      'https://localhost:44364/api/companyapi/compdetails',{ params: { id } }
    );
  }

  // getAllProducts(): Observable<any> {
  //   // console.log(data, 'data');
  //   return this.http.get<any>(
  //     'https://develop.conome.mk/api/companyapi/allproducts'
  //   );
  // }

  getProductsbyID(id): Observable<any> {
    return this.http.get<IProduct>(
      'https://localhost:44364/api/companyapi/details',{ params: { id } }
    );
  }

  getProducts(): Observable<any> {
    return this.http.get<IProduct>(
      'https://localhost:44364/api/companyapi/product'
    );
  }
}
