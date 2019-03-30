import { Component, OnInit, ViewChild } from '@angular/core';
import { Payments } from './../model/payment.class';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemCart } from './../../../modules/itemCart.model';
import { Product } from './../../../modules/getToken/product.class';
import Swal from 'sweetalert2';
import 'lodash';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { PaymentsService } from './../services/payments.service';
import { Router } from '@angular/router';

declare var $;
declare var _: any;
declare var require: any;
var uniqWith = require('lodash.unzip');


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  public name = "";
  public checkout = {
    name: '',
    email: '',
    phone: null,
    postcode: null,
    address: '',
    card_tok: "tok_visa",
    description: '',
    products: []
  };

  public items: ItemCart[] = [];
  public listAddToCart: Product[] = [];
  public quantity: number;
  private total: number = 0;
  private totalQtyProduct: number = 0;
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
  stripeTest: FormGroup;
  constructor(private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentservice: PaymentsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCart();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onSubmitForm(frmCheckOut: NgForm) {
    if (frmCheckOut.valid) {
      const name = this.stripeTest.get('name').value;
      this.stripeService
        .createToken(this.card.getCard(), { name })
        .subscribe(result => {
          if (result.token) {
            this.paymentservice.checkOut(this.checkout).subscribe(data => {
              console.log(data);
              // localStorage.removeItem('cart');
              // this.router.navigate(['/']);
            });
          } else if (result.error) {
            Swal.fire({
              type: 'error',
              title: "Can't Checkout !",
              text: result.error.message,
            })
            console.log(result.error.message);
          }
        });
    } else {
      Swal.fire({
        type: 'error',
        title: "Can't Checkout !",
        text: 'Enter the full fields...',
      })
    }
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
      this.checkout.products.push({
        id: item.productCart._id,
        qty: item.quantity
      });
      this.total += item.productCart.price * item.quantity;
      this.totalQtyProduct += item.quantity;
      this.quantity += item.quantity;
      this.listAddToCart = _.uniqWith(this.items, _.isEqual);

    }
  }

}
