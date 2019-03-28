import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from "./../model/category.class";
import { SerCategoryService } from "./../service/ser-category.service";

@Component({
  selector: 'app-add-sub-cate',
  templateUrl: './add-sub-cate.component.html',
  styleUrls: ['./add-sub-cate.component.css']
})
export class AddSubCateComponent implements OnInit {

  public subcription: Subscription;
  public subcriptionParams: Subscription;
  public _category: Category = {
    is_active: true,
    sub_category: []
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    public categoryservice: SerCategoryService,
    private activeRouteService: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subcriptionParams = this.activeRouteService.params.subscribe((data: Params) => {
      console.log(data);
      this.subcription = this.categoryservice.getCategoryByID(data['id']).subscribe((categorys: Category) => {
        console.log(categorys);
        this._category = categorys;
      })
    })
  }
  onAddSub() {
    console.log(this._category);
    this.categoryservice.addSubCateByID(this._category).subscribe((data: Category) => {
      console.log(data);
      // this.router.navigateByUrl('/admin');
    });
  }
  onsubmit(frm){
    this.onAddSub();
  }
}
