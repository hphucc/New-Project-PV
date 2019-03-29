import { Component, OnInit } from '@angular/core';
import { ItemCart } from "./../../modules/itemCart.model";
import { ProductCart } from "./../../modules/productCart.model";
import 'lodash';
declare var $;
declare var _: any;
declare var require: any;
var uniqWith = require('lodash.unzip');

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public total: number = 0;
  public items: ItemCart[];
  public quantity: number;
  public listAddToCart: {};
  public showCheckQty: boolean;

  constructor() { }

  ngOnInit() {
    this.loadCart()
  }
  loadCart(): void {
    this.total = 0;
    this.items = [];
    this.quantity = 0;
    let cart = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        productCart: item.productCart,
        quantity: item.quantity
      });
      this.total += item.productCart.price * item.quantity;
      this.quantity += item.quantity;
      // this.checkCartNull = true;
      this.listAddToCart = _.uniqWith(this.items, _.isEqual);
    }
  }

  addProduct(id: string) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: ItemCart = JSON.parse(cart[i]);
      if (item.productCart['_id'] == id) {
        index = i;
        break;
      }
    }
    
    var checkQuantity = JSON.parse(cart[i])
    if(checkQuantity.quantity <= checkQuantity.productCart.quantity - 1){
      // checkQuantity.productCart.quantity - checkQuantity.quantity
      if (index != -1) {
        let item: ItemCart = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }else{
      this.showCheckQty = true;
      alert('Quá giới hạng số lượng sản phẩm hiện có ...')
    }
    this.loadCart();
  }

  subProduct(id: string) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: ItemCart = JSON.parse(cart[i]);
      if(item.quantity > 1){
        if (item.productCart['_id'] == id) {
        index = i;
        break;
       }
      }
      
    }

    if (index != -1) {
      let item: ItemCart = JSON.parse(cart[index]);
      item.quantity -= 1;
      cart[index] = JSON.stringify(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    this.loadCart();
  }

  remove(id) {
    let cart: any = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item: ItemCart = JSON.parse(cart[i]);
      if (item.productCart['_id'] == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
    setTimeout(function () { window.location = window.location; }, 0);
  }

}
