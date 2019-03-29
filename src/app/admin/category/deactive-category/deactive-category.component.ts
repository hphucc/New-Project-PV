import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SerCategoryService } from "./../service/ser-category.service";
import { Category } from "./../model/category.class";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-deactive-category',
  templateUrl: './deactive-category.component.html',
  styleUrls: ['./deactive-category.component.css']
})
export class DeactiveCategoryComponent implements OnInit {

  public subcription: Subscription;
  public _category: Category = [];

  constructor(private router: Router,
      public categoryservice: SerCategoryService
    ) { }

  ngOnInit() {
    this.subcription = this.categoryservice.listDeactiveCate(this._category).subscribe(data=>{
      this._category = data;
      console.log(data);
    });
  }
  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }

  loadproduct(){
    this.subcription = this.categoryservice.getAllCategory(this._category).subscribe(data=>{
      this._category = data;
    });
   }
  
   onActive(id: string){
    this.categoryservice.getCategoryByID(id).subscribe(data =>{
      this._category = data;
      this.categoryservice.activeCategory(this._category).subscribe(data =>{
        this.loadproduct();
        this.router.navigate(['/admin/listcategory']);
      })
    })
  }

}
