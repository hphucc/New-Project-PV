import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/modules/getToken/product.class';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  public products : Product

  constructor(
    private activeRouter : ActivatedRoute,
    private productService : DataService
  ) { }

  ngOnInit() {
  }

  loadProduct(){
    this.activeRouter.params.subscribe((data:Params)=>{
      this.products = data;
      console.log(this.products)
    })
  }
}
