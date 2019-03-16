import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppmenuComponent } from './components/appmenu/appmenu.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from "@angular/common/http";
import { BodyComponent } from "./giaodien/body/body.component";
import { FootComponent } from "./giaodien/foot/foot.component";
import { HeaderComponent } from "./giaodien/header/header.component";
import { HomeComponent } from "./home/home.component";
//service
import { AuthTokenService } from "./services/auth-token.service";
import { AuthGuard } from "./auth/auth-login.gaurd";
import { AddproductComponent } from './products-admin/product-add/addproduct/addproduct.component';
import { EditproductComponent } from './products-admin/product-edit/editproduct/editproduct.component';
import { DeleteproductComponent } from './products-admin/product-delete/deleteproduct/deleteproduct.component';
import { ListproductComponent } from "./admin/listproduct/listproduct.component";
import { DetailProductComponent } from './giaodien/detail-product/detail-product.component';


//
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingsComponent,
    UserComponent,
    AddproductComponent,
    EditproductComponent,
    DeleteproductComponent,
    BodyComponent,
    FootComponent,
    HeaderComponent,
    HomeComponent,
    ListproductComponent,
    DetailProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthTokenService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
