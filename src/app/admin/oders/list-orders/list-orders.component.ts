import { Component, OnInit } from '@angular/core';
import { Orders } from "./../model/orders.class";
import { OrderService } from "./../service/order.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  public orders: Orders = [];
  public subscription: Subscription
  public _status = {
    status: 'success'
  }
  public _statuspen = {
    status: 'pending'
  }
  constructor(
    private router: Router,
    private oderservice: OrderService
  ) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.oderservice.showListOrder(this.orders).subscribe(data=>{
      this.orders = data;
    })
  }

  onPending(id){
    this.oderservice.checkOrder(id,this._statuspen).subscribe(data=>{
      this.load();
    })
  }

  onSuccess(id){
    this.oderservice.checkOrder(id,this._status).subscribe(data=>{
      this.load();
    })
  }
  onDetail(id){
    this.oderservice.detailOrder(id).subscribe(data=>{

    })
  }

}
