import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Payments } from "./../model/payment.class";
import { PaymentsService } from "./../services/payments.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';
import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  
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

  public checkout = {};
  public subscription: Subscription;

  constructor(
    private router: Router,
    private paymentservice: PaymentsService,
    private stripeService: StripeService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  
  onAdd(){
    this.subscription = this.paymentservice.checkOut(this.checkout).subscribe(data=>{
      console.log(data);
    })
  }
  onSubmitForm(frmCheckOut){
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
}
