
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../../services/data.service";
import { Subscription } from "rxjs";
import { Product } from "./../../../modules/getToken/product.class";

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit, OnDestroy {
  public subcription: Subscription;
  public _product: Product = [];
  public imageProduct: string;
  public images = [];
  public ImageObj = {};
  public dataImage ="";
  public _id:string;
  public deleteImages: string;
  public show = false;

  constructor(private router: Router,
      public productservice: DataService,
    ) { }

  
  ngOnInit() {
    this.loadproducts();
  }

  loadproducts(){
    this.subcription = this.productservice.getAllproduct(this._product).subscribe(data=>{
      this._product = data['docs'];
      // this.imageProduct = this._product['0'];
      // this._id = this.imageProduct['_id'];
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
 //click load and show add URL id
 loadid(id){
    this._id = id;
    this.show = !this.show;
 }
 //Add Images
 addImage(){
  this.images.push(this.dataImage);
  this.ImageObj['images'] = this.images;
  console.log(JSON.stringify(this.ImageObj));
   this.subcription = this.productservice.postImages(this._id,JSON.stringify(this.ImageObj)).subscribe(data => {
    this.loadproducts();
    this.images = [];
  })
}

//delete images
  onDelete(item){
    console.log(item.images);
    this.images.push(this.dataImage);
    this.ImageObj['images'] = this.images;
    // console.log(JSON.stringify(this.ImageObj));
   this.subcription = this.productservice.deleteImage(this._id).subscribe(data => {
    this.loadproducts();
    this.images = [];
    })
  }
 //deactive
 loadproduct(){
  this.subcription = this.productservice.getAllproduct(this._product).subscribe(data=>{
    this._product = data;
  });
 }
 
 onDeActive(id: string){
  this.productservice.getProductByID(id).subscribe(data =>{
    this._product = data;
    this.productservice.DeactiveProduct(this._product).subscribe(data =>{
      this.loadproduct();
      this.router.navigate(['/admin/deactive/:id']);
    })
  })
}

}