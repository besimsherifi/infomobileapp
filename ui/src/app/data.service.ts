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

  getCrmCompaniesByUserAddress(): Observable<any> {
    return this.http.get<any>('linkapi/companyapi/index');
  }


  getcompaniesbyID(id): Observable<any> {
    return this.http.get<IProduct>(
      'linkapi/companyapi/compdetails',{ params: { id } }
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(
      'linkapi/companyapi/allproducts'
    );
  }

  getProductsbyID(id): Observable<any> {
    return this.http.get<IProduct>(
      'linkapi/companyapi/details',{ params: { id } }
    );
  }

  getProducts(): Observable<any> {
    return this.http.get<IProduct>(
      'linkapi/companyapi/product'
    );
  }
}
