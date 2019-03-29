import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "./../../services/data.service";
import { Subscription, Observable } from "rxjs";
import { Product } from "./../../modules/getToken/product.class";

declare var $;

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, OnDestroy {
  public observable = Observable;
  public subcription: Subscription;
  public _product: Product = [];
  // public test = false;
  constructor(private router: Router,
      public productservice: DataService
    ) { }
    
  async ngOnInit() {
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
    this.subcription = this.productservice.getAllproduct(this._product).subscribe(data=>{
      this._product = data['docs'];
    });
  }

  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
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
    $('.responsive-hmv').slick({
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
  } // showSlider

}
