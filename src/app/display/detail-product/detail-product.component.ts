import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from "./../../../environments/environment";
import { Subscription, Observable,  } from "rxjs";
import { Product } from 'src/app/modules/getToken/product.class';
import { ItemCart } from 'src/app/modules/itemCart.model';

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
  public images: string;
  public item: {};

  constructor(
    private activatedRoute : ActivatedRoute,
    private productService : DataService,
    private router: Router
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

  // Click Thumbnail
  onChange(image){
    this.images = image;
  }

  // show product Detail
  showProductDetail() {
    this.subscription = this.activatedRoute.params.subscribe((data: Params) => {
      let id = data['id'];
      this.subscription = this.productService.getIdProductDetail(id).subscribe((item: string) => {
        this.products = item;
        // console.log(this.products); 
      })
    })
  }

  loadProduct(){
    this.activatedRoute.params.subscribe((data:Params)=>{
      this.products = data;
      // console.log(this.products);
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
  //Cart
  addToCart(id: string) {
    if (id) {
      this.item = {
        productCart: this.products,
        quantity: 1
      };
      if (localStorage.getItem('cart') == null) {
        let cart = [];
        cart.push(JSON.stringify(this.item));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem('cart'));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: ItemCart = JSON.parse(cart[i]);
          if (item.productCart['_id'] == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(JSON.stringify(this.item));
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
          let item: ItemCart = JSON.parse(cart[index]);
          item.quantity += 1;
          cart[index] = JSON.stringify(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
    this.router.navigateByUrl('/admin/cartproduct');
  }
}
