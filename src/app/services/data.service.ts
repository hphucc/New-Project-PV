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
const urlDeactive = `${environment.apiPV}/api/v1/products/deactive`
const urlDeActiveList = `${environment.apiPV}/api/v1/products/list?is_active=0`
const urlImage =`${environment.apiPV}/api/v1/upload/image`

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
  DeactiveProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${urlDeactive}/${product['_id']}`, product, { headers: this.headers });
  }
//Danh sach san pham bi Deactive
  getDeactive(product: Product): Observable<Product>{
    return this.http.get<Product>(urlDeActiveList);
  }
//Active sản phẩm bị vô hiệu hóa
  OnActiveProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(`${urlActive}/${product['_id']}`, product, { headers: this.headers });
  }
//upload image 
  // postImages(product: Product): Observable<Product>{
  //   return this.http.post<Product>(urlImage, product, {headers: this.headers});
  // }
}
