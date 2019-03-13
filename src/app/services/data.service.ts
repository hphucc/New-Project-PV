import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from "./../modules/getToken/product.class";

const url = `${environment.apiPV}/api/v1/products/list`
const urls = `${environment.apiPV}/api/v1/products/create`
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) {
    this.headers = this.setHeaders();
  }

  setHeaders(): HttpHeaders {
    const header = new HttpHeaders();
    const token: string = localStorage.getItem('userToken');
    if (!token) {
      return header.set('Content-Type', 'application/json');
    }
    return header.set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);
  }

  getAllproduct(product: Product): Observable<Product> {
    return this.http.get<Product>(url);
  }

  addAllproduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(urls, product, { headers: this.headers });
  }

}
