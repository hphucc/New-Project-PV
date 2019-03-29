import { Component, OnInit, OnDestroy } from '@angular/core';
import { SerCategoryService } from "./../service/ser-category.service";
import { Category } from "./../model/category.class";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';



@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  public subcription: Subscription;
  public _category: Category = [];
  constructor(
    private router: Router,
    private sercategory: SerCategoryService
  ) { }

  ngOnInit() {
    this.subcription = this.sercategory.getAllCategory(this._category).subscribe(data =>{
      this._category = data;
      // 
    })
  }

  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }

  //deactive
 loadproduct(){
  this.subcription = this.sercategory.getAllCategory(this._category).subscribe(data=>{
    this._category = data;
   
  });
 }

 onDeActive(id: string){
  this.sercategory.getCategoryByID(id).subscribe(data =>{
    // console.log(data);
    this._category = data;
    this.sercategory.DeactiveCate(this._category).subscribe(data =>{
      this.loadproduct();
      this.router.navigate(['/admin/deactivecate/:id']);
    })
  })
}
}
