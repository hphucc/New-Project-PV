import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from "./../modules/getToken/product.class";

const url = `${environment.apiPV}/api/v1/products/list`
const urls = `${environment.apiPV}/api/v1/products/create`
const urlEdit = `${environment.apiPV}/api/v1/products/update`
const urlDetail = `${environment.apiPV}/api/v1/products/details`
const urlActive = `${environment.apiPV}/api/v1/products/active`
const urlDeActive = `${environment.apiPV}/api/v1/products/deactive`

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
//Show san pham
  getAllproduct(product: Product): Observable<Product> {
    return this.http.get<Product>(url);
  }
//Them san pham
  addAllproduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(urls, product, { headers: this.headers });
  }
//Updata san pham
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${urlEdit}/${product['_id']}`, product, { headers: this.headers });
  }

  getProductByID(id: string): Observable<Product> {
    return this.http.get<Product>(`${urlDetail}/${id}`, { headers: this.headers });
  }
//Vo hieu hoa san pham
  DeactiveProduct(id: string): Observable<Product>{
    return this.http.put<Product>(`${urlDetail}/${id}`, { headers: this.headers });
  }
}
