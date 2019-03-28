import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from "./../../../environments/environment";
import { Subscription, Observable,  } from "rxjs";
import { Product } from 'src/app/modules/getToken/product.class';

declare var $;

const urlDetail = `${environment.apiPV}/api/v1/products/details`;

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  public products : Product
  public product : Product
  public subscription: Subscription;
  public subScriptionParam : Subscription; 
  public _product: Product;

  constructor(
    private activatedRoute : ActivatedRoute,
    private productService : DataService
  ) { }

  ngOnInit() {
    this.showProductDetail();
    this.show();

    setTimeout(()=> {
      this.show()
    },0)
    setTimeout(()=>{
      this.showSlider()
    }, 2000)
    setTimeout(()=>{
      this.showSliderhmv()
    }, 2000)
  }

  show(){
    this.subscription = this.productService.getAllproduct(this.product).subscribe(data=>{
      this._product = data['docs'];
    });
  }

  // show product Detail
  showProductDetail() {
    this.subscription = this.activatedRoute.params.subscribe((data: Params) => {
      let id = data['id'];
      this.subscription = this.productService.getIdProductDetail(id).subscribe((item: string) => {
        this.products = item;
        console.log(this.products); 
      })
    })
  }

  loadProduct(){
    this.activatedRoute.params.subscribe((data:Params)=>{
      this.products = data;
      console.log(this.products);
    })
  }

  showSlider(){
    $('.responsive').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
  } // showSlider

  showSliderhmv(){
    $('.responsivehmv').slick({
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })
  } // showSlider_hmv

}
