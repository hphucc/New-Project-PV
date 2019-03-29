import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SerCategoryService } from "./../service/ser-category.service";
import { Category } from "./../model/category.class";
import { Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  public subcription: Subscription;
  public subcriptionParams: Subscription;
  public category: Category = {};
  // public images: string;
  // public files: any[];
  constructor(
    private http: HttpClient,
    private router: Router,
    public categoryservice: SerCategoryService,
    private activeRouteService: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subcriptionParams = this.activeRouteService.params.subscribe((data: Params) => {
      this.subcription = this.categoryservice.getCategoryByID(data['id']).subscribe((categorys: Category) => {
        this.category = categorys;
      })
    })
  }
  onUpdate(){
    this.subcription = this.categoryservice.UpdateCate(this.category).subscribe((data: Category) => {
      console.log(data);
      this.router.navigateByUrl('/admin/listcategory');
    });
  }
  ngOnDestroy() {
    if (this.subcription)
      this.subcription.unsubscribe();
    if (this.subcriptionParams)
      this.subcriptionParams.unsubscribe();
  }

}
