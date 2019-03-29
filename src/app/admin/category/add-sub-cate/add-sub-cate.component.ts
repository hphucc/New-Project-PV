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

  public id:string;
  public _name = {
    name:''
  }

  constructor(
    public categoryservice: SerCategoryService,
    private activeRouteService: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.activeRouteService.params.subscribe((data: Params) => {
      this.id = data['id']
      // console.log(this.id);
    })
  }
  onsubmit(frm){
    this._name.name = frm;
    this.categoryservice.addSubCateByID(this.id, this._name).subscribe(data=>{
      this.router.navigateByUrl('/admin/listcategory');
      // console.log(data);
    })
  }
}
