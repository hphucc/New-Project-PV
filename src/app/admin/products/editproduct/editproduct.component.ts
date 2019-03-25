import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "./../../../services/data.service";
import { Subscription } from "rxjs";
import { Product } from "./../../../modules/getToken/product.class";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit, OnDestroy {

  public subcription: Subscription;
  public subcriptionParams: Subscription;
  public product: Product = {};
  public images: string;
  public files: any[];
  constructor(
    private http: HttpClient,
    private router: Router,
    public productservice: DataService,
    private activeRouteService: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subcriptionParams = this.activeRouteService.params.subscribe((data: Params) => {
      this.subcription = this.productservice.getProductByID(data['id']).subscribe((products: Product) => {
        this.product = products;
      })
    })
  }
  
  onUpdate() {
    this.subcription = this.productservice.updateProduct(this.product).subscribe((data: Product) => {
      // console.log(data);
      this.router.navigateByUrl('/admin');
    });
  }

  ngOnDestroy() {
    if (this.subcription)
      this.subcription.unsubscribe();
    if (this.subcriptionParams)
      this.subcriptionParams.unsubscribe();
  }
  handleFileInput(event) {
    const oFReader = new FileReader();
    const image = event.target.files[0];
  
    oFReader.readAsDataURL(image);
    oFReader.onload = (oFREvent) => {
      this.product['images'] = oFREvent.target['restult'];
    };
    this.images = image;
    console.log(image);
  }
  
}
