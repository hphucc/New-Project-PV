// Service Token
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenParams } from './../modules/getToken/Token.class';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from "./../../environments/environment";


const url = `${environment.apiPV}/api/v1/admin/login`;

@Injectable({
  providedIn: 'root'
})

export class AuthTokenService {

  public headers: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _router: Router,
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

  login(body): Observable<TokenParams> {
    return this._http.post<TokenParams>(url, body, { headers: this.headers })
      .pipe(map(rer => rer), catchError(error => this.errorHandler(error)));
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    if (error.status >= 500) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: '500 Internal Server Error, please try agian later!',
        footer: '<a href>Why do I have this issue?</a>'
      });
    } else if (error.status === 401 && error.statusText === 'UNAUTHORIZED') {
      localStorage.removeItem('userToken');
    } else {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Email or password is wrong!',
      });
    }
    return throwError(error);
  }
}