import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { NotFoundComponent } from './login/not-found/not-found.component';
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from "./admin/addproduct/addproduct.component";
import { ListproductComponent } from "./admin/listproduct/listproduct.component";
import { EditproductComponent } from "./admin/editproduct/editproduct.component";
import { DeleteproductComponent } from "./admin/deleteproduct/deleteproduct.component";
import { FormsModule } from '@angular/forms';
import { DetailProductComponent } from './giaodien/detail-product/detail-product.component';
;

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ListproductComponent
      },
      {
        path: 'addproduct',
        component: AddproductComponent
      }
    ]
  },
  {
    path: 'login',
    component: UserComponent
  },
  {
    path: 'detail/:id',
    component: DetailProductComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    
    LoginComponent,
    NotFoundComponent,
    AddproductComponent, 
   
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
