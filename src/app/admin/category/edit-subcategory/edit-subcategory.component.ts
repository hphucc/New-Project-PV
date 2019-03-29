import { Component, OnInit } from '@angular/core';
import { SerCategoryService } from "./../service/ser-category.service";
import { Category } from "./../model/category.class";
import { Params, Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})

export class EditSubcategoryComponent implements OnInit {
  public category: Category = [];
  public id: string;
  public name: string;
  public idsub: string;
  public _name = {
    name: ''
  }
  constructor(
    private categoryservice: SerCategoryService,
    private activaterouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activaterouter.params.subscribe((data: Params) => {
      this.id = data['id'];
       this.categoryservice.getCategoryByID(data['id']).subscribe((data: Category) => {
        this.category = data;
      })
    })
  }

  onSelected(event) {
    this.name = event.name;
    this.idsub = event._id;
  }

  onItemRemoved(event){
    this.idsub = event._id;
    this.categoryservice.DeleteSubCate(this.id,this.idsub).subscribe(data=>{
    })
  }

  onUpdate(subname) {
    this._name.name = subname;
    this.categoryservice.EditSubCate(this.id,this.idsub,this._name).subscribe(data => {
    })
  }

}
