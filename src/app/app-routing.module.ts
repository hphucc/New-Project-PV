import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';


import { LoginComponent } from './login/login/login.component';
import { NotFoundComponent } from './login/not-found/not-found.component';
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from "./admin/products/addproduct/addproduct.component";
import { ListproductComponent } from "./admin/products/listproduct/listproduct.component";
import { EditproductComponent } from "./admin/products/editproduct/editproduct.component";
import { DeleteproductComponent } from "./admin/products/deleteproduct/deleteproduct.component";
import { DeactiveListComponent } from "./admin/products/deactive-list/deactive-list.component";
import { ListCategoryComponent } from "./admin/category/list-category/list-category.component";
//display
import { FootComponent } from "./display/foot/foot.component";
import { HeaderComponent } from "./display/header/header.component";
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { BodyComponent } from "./display/body/body.component";
import { AppfooterComponent } from './components/appfooter/appfooter.component';
//category
import { AddCategoryComponent } from "./admin/category/add-category/add-category.component";
import { AddSubCateComponent } from "./admin/category/add-sub-cate/add-sub-cate.component";


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
      //Product
      {
        path: 'addproduct',
        component: AddproductComponent
      },
      {
        path: 'editproduct/:id',
        component: EditproductComponent
      },
      {
        path: 'deactive/:id',
        component: DeactiveListComponent
      },
      //Category
      {
        path: 'listcategory',
        component: ListCategoryComponent
      },
      {
        path: 'addcategory',
        component:AddCategoryComponent
      },
      {
        path: 'addsubcate/:id',
        component: AddSubCateComponent
      }
    ]
  },
  {
    path: 'login',
    component: UserComponent
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
    EditproductComponent,
    ListproductComponent,
    DeleteproductComponent,
    DeactiveListComponent,
    ListCategoryComponent,
    HomeComponent,
    UserComponent,
    FootComponent,
    AppmenuComponent,
    HeaderComponent,
    AppheaderComponent,
    AppfooterComponent,
    BodyComponent,
    AddCategoryComponent,
    AddSubCateComponent
  ],
  imports: [
    TagInputModule,
    BrowserModule ,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
