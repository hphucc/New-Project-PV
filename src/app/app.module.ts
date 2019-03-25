import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AppsettingsComponent } from './components/appsettings/appsettings.component';
import { HttpClientModule } from "@angular/common/http";
//service
import { AuthTokenService } from "./services/auth-token.service";
import { AuthGuard } from "./auth/auth-login.gaurd";
import { DataService } from "./services/data.service";
import { SerCategoryService } from "./admin/category/service/ser-category.service";


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AppsettingsComponent
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
    AuthGuard,
    DataService,
    SerCategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
