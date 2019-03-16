import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../services/data.service";
import { Subscription } from "rxjs";
import { Product } from "./../../modules/getToken/product.class";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit, OnDestroy {
  public subcription: Subscription;
  public product: Product = {};
  public image: any;
  constructor(
      private router: Router,
      public productservice: DataService
    ) { }

  ngOnInit() {
    
  }

  onAdd(){
    this.subcription = this.productservice.addAllproduct(this.product).subscribe(data =>{
      if(data && data['_id']){
        this.router.navigate(['admin']);
      }
    })
  }

  onSubmit(frm){
    console.log(frm.valid);
    if(frm.valid){
      this.onAdd();
    }
    else{
      Swal.fire({
        title : 'Opps...',
        text : 'Not Empty'
      })
    }
  }

  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }
  
  handleFileInput(event) {
    const oFReader = new FileReader();
    const image = event.target.files[0];
    oFReader.readAsDataURL(image);
    oFReader.onload = (oFREvent) => {
      this.product['images'] = oFREvent.target['restult'];
    };
    this.image = image;
    console.log(this.image);
  }
  
}
