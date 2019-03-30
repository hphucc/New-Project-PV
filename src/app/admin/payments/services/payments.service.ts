import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Payments } from "./../model/payment.class";

const urlListBuyer= `${environment.apiPV}/api/v1/payments/buyers?page=1&limit=100`;
const urlBuyerDetail = `${environment.apiPV}/api/v1/payments/buyers`;
const urlCheckout = `${environment.apiPV}/api/v1/payments/checkout`;


@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

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
  //List Buyer
  getListBuyer(): Observable<Payments>{
    return this.http.get<Payments>(urlListBuyer, { headers: this.headers });
  }
  //Detail Buyer
  buyerDetail(id: string): Observable<Payments>{
    return this.http.get<Payments>(`${urlBuyerDetail}/${id}`, { headers: this.headers });
  }
  //show checkout
  checkOut(body): Observable<Payments>{
    return this.http.post<Payments>(urlCheckout, body ,{ headers: this.headers });
  }
}
