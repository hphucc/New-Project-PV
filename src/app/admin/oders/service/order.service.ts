import { Injectable } from '@angular/core';
import { Orders } from "./../model/orders.class";
import { environment } from "./../../../../environments/environment";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';

const urlListOders=`${environment.apiPV}/api/v1/orders/list?page=1&limit=10`;
const urlCheckOrder=`${environment.apiPV}/api/v1/orders/check-status`;
const urlDetailOders=`${environment.apiPV}/api/v1/orders/details`;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public headers: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private router: Router
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

  //Show List Orders
  showListOrder(order: Orders):Observable<Orders>{
    return this.http.get<Orders>(urlListOders, {headers: this.headers});
  }
  //Check Order
  checkOrder(id:string, status: {}): Observable<Orders>{
    return this.http.post<Orders>(`${urlCheckOrder}/${id}`, status, {headers: this.headers})
  }
  //Detail Orders
  detailOrder(id: string): Observable<Orders[]>{
    return this.http.get<Orders[]>(`${urlDetailOders}/${id}`, {headers: this.headers});
  }

}
