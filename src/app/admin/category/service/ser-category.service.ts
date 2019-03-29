import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Category } from "./../model/category.class";
import { Sub_Category } from "./../model/sub_category.class";
import { catchError, map, retry } from 'rxjs/operators';
import Swal from 'sweetalert2';


const urlListCategory=`${environment.apiPV}/api/v1/categories/list`;
const urlAddCategory=`${environment.apiPV}/api/v1/categories/create`;
const urldetail=`${environment.apiPV}/api/v1/categories/details`;
const urlAddSubCate=`${environment.apiPV}/api/v1/categories/create`;
//Update category
const urlUpdateCate=`${environment.apiPV}/api/v1/categories/update`;
//Active category
const urlDeactive=`${environment.apiPV}/api/v1/categories/deactive`;
const urlActive=`${environment.apiPV}/api/v1/categories/active`;
const urlListDeactiveCate=`${environment.apiPV}/api/v1/categories/list?is_active=0`;
const urlEditSubCate=`${environment.apiPV}/api/v1/categories/update`;
const urlDeleteSub=`${environment.apiPV}/api/v1/categories/delete`;

@Injectable({
  providedIn: 'root'
})
export class SerCategoryService {

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

  //List Category
  getAllCategory(category:Category): Observable<Category>{
    return this.http.get<Category>(urlListCategory);
  }

  //Add Category
  addAllCategory(category: Category): Observable<Category[]>{
    return this.http.post(urlAddCategory, category, {headers: this.headers})
    .pipe(map(data => data),catchError(error => this.errorHandler(error)));
  }

  //Add sub category by ID
  getCategoryByID(id: string): Observable<Category>{
    return this.http.get(`${urldetail}/${id}`, {headers: this.headers })
    .pipe(map(data => data),catchError(error => this.errorHandler(error)));
  }
  
  addSubCateByID(id:string, name: {}): Observable<Category>{
    return this.http.post(`${urlAddSubCate}/${id}/sub_category`, name, {headers: this.headers})
    .pipe(map(data => data),catchError(error => this.errorHandler(error)));
  }

  // Update Category
  UpdateCate(category: Category): Observable<Category>{
    return this.http.put<Category>(`${urlUpdateCate}/${category['_id']}`, category, {headers: this.headers});
  }
  
  //Dreactive Category
  DeactiveCate(category: Category): Observable<Category>{
    return <Observable<Category>>this.http.put(`${urlDeactive}/${category['_id']}`, category, {headers: this.headers});
  }

  //show list deactive category
  listDeactiveCate(category: Category):Observable<Category>{
    return <Observable<Category>>this.http.get(urlListDeactiveCate);
  }

  //Active Category
  activeCategory(category: Category):Observable<Category>{
    return <Observable<Category>>this.http.put<Category>(`${urlActive}/${category['_id']}`, category, { headers: this.headers });
  }

  //Edit Sub_Category
  EditSubCate(id:string, idsub:string, name: {}): Observable<Category>{
    return this.http.put<Category>(`${urlEditSubCate}/${id}/sub_category/${idsub}`, name, {headers: this.headers})
  }

  //Delete Sub-Category
  DeleteSubCate(id:string, idsub:string):Observable<Category>{
    return this.http.delete<Category>(`${urlDeleteSub}/${id}/sub_category/${idsub}`,{headers: this.headers})
  }

  //Error
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    if (error.status >= 500) {
      Swal.fire({
        title: 'Opps...',
        text: '500 Internal Server Error, please try agian later!',
      });
    } else if (error.status === 401 && error.statusText === 'UNAUTHORIZED') {
      localStorage.removeItem('token');
    } else if (error.status === 404) {
      this.router.navigate(['**']);
    } else if (error.status === 0) {
      Swal.fire({
        title: 'Opps...',
        text: error.statusText,
      });
    }
    return throwError(error);
  }
}
