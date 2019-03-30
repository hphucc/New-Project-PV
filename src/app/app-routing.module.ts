import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxStripeModule } from 'ngx-stripe';
//Component
import { LoginComponent } from './login/login/login.component';
import { NotFoundComponent } from './login/not-found/not-found.component';
import { UserComponent } from "./components/user/user.component";
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
//Products
import { AddproductComponent } from "./admin/products/addproduct/addproduct.component";
import { ListproductComponent } from "./admin/products/listproduct/listproduct.component";
import { EditproductComponent } from "./admin/products/editproduct/editproduct.component";
import { DeleteproductComponent } from "./admin/products/deleteproduct/deleteproduct.component";
import { DeactiveListComponent } from "./admin/products/deactive-list/deactive-list.component";
import { ListCategoryComponent } from "./admin/category/list-category/list-category.component";
import { DetailProductComponent } from "./display/detail-product/detail-product.component";
import { UploadImageComponent } from "./admin/products/upload-image/upload-image.component";
//Display
import { FootComponent } from "./display/foot/foot.component";
import { HeaderComponent } from "./display/header/header.component";
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { BodyComponent } from "./display/body/body.component";
import { AppfooterComponent } from './components/appfooter/appfooter.component';
//category
import { AddCategoryComponent } from "./admin/category/add-category/add-category.component";
import { AddSubCateComponent } from "./admin/category/add-sub-cate/add-sub-cate.component";
import { EditCategoryComponent } from './admin/category/edit-category/edit-category.component';
import { DeactiveCategoryComponent } from './admin/category/deactive-category/deactive-category.component';
import { EditSubcategoryComponent } from './admin/category/edit-subcategory/edit-subcategory.component';
//Orders
import { ListOrdersComponent } from './admin/oders/list-orders/list-orders.component';
import { DetailOrderComponent } from './admin/oders/detail-order/detail-order.component';
//Payments
import { ListPaymentComponent } from './admin/payments/list-payment/list-payment.component';
import { CheckoutComponent } from './admin/payments/checkout/checkout.component';

//Cart
import { CartComponent } from "./display/cart/cart.component";




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
      {
        path: 'uploadimage',
        component: UploadImageComponent
      },
      {
        path: 'cartproduct',
        component: CartComponent
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
      },
      {
        path: 'editcategory/:id',
        component: EditCategoryComponent
      },
      {
        path: 'deactivecate/:id',
        component: DeactiveCategoryComponent
      },
      {
        path:'editsubcategory/:id',
        component: EditSubcategoryComponent
      },
      //Orders
      {
        path: 'orderList',
        component: ListOrdersComponent
      },
      {
        path: 'detailOrder/:id',
        component: DetailOrderComponent
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
    path: 'checkout',
    component: CheckoutComponent
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
    AddSubCateComponent,
    EditCategoryComponent,
    DeactiveCategoryComponent,
    EditSubcategoryComponent,
    ListOrdersComponent,
    DetailOrderComponent,
    ListPaymentComponent,
    DetailProductComponent,
    UploadImageComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    TagInputModule,
    BrowserModule ,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxStripeModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
