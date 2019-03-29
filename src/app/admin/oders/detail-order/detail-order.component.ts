import { Component, OnInit } from '@angular/core';
import { OrderService } from "./../service/order.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit {
  public orders: {};
  constructor(
    private router: Router,
    private orderservice: OrderService,
    private activaterouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.activaterouter.params.subscribe((data: Params) => {
      this.orderservice.detailOrder(data['id']).subscribe((data) => {
        this.orders = data;
        console.log(this.orders)
      })
    });
  }


}
