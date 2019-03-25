import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../../services/data.service";
import { Subscription } from "rxjs";
import { Product } from "./../../../modules/getToken/product.class";

@Component({
  selector: 'app-deactive-list',
  templateUrl: './deactive-list.component.html',
  styleUrls: ['./deactive-list.component.css']
})
export class DeactiveListComponent implements OnInit, OnDestroy {

  public subcription: Subscription;
  public _product: Product = [];

  constructor(private router: Router,
      public productservice: DataService
    ) { }

  
  ngOnInit() {
    this.subcription = this.productservice.getDeactive(this._product).subscribe(data=>{
      this._product = data['docs'];
      console.log(data);
    });
  }

  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }

  onLogout(){
    if(localStorage.getItem('userToken')){
      localStorage.removeItem('userToken');
      this.router.navigate(['login']);
    }  
 }

 loadproduct(){
  this.subcription = this.productservice.getAllproduct(this._product).subscribe(data=>{
    this._product = data;
  });
 }

 onActive(id: string){
  this.productservice.getProductByID(id).subscribe(data =>{
    this._product = data;
    this.productservice.OnActiveProduct(this._product).subscribe(data =>{
      this.loadproduct();
      this.router.navigate(['admin']);
    })
  })
}

}
