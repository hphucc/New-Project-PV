import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../services/data.service";
import { Subscription } from "rxjs";
import { Product } from "./../../modules/getToken/product.class";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {

  public subcription: Subscription;
  public _product: Product = {};
  constructor(private router: Router,
      public productservice: DataService
    ) { }

  
  ngOnInit() {
    this.subcription = this.productservice.getAllproduct(this._product).subscribe(data=>{
      this._product = data;
      console.log(data);
    });
  }


  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }

}
