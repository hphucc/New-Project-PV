import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';
import { Category } from '../model/category.class';
import { Sub_Category } from "./../model/sub_category.class";
import { SerCategoryService } from '../service/ser-category.service';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public category = {
    is_active: true,
    sub_category: []
  };

  constructor(
    private router: Router,
    private sercategoryService: SerCategoryService
  ) { }

  ngOnInit() { }

  onAdd() {
    // console.log(this.category);
    this.sercategoryService.addAllCategory(this.category).subscribe(data=>{
      // console.log(data);
      if (data && data['_id']) {
        this.router.navigate(['/admin/listcategory']);
      }
    }, error => console.log(error));
  }
  
  onSubmit(frm) {
    // this.onAdd();
    if (frm.valid) {
     this.onAdd();
    }
    else {
      Swal.fire({
        title: 'Opps...',
        text: 'Not Empty'
      })
    }
  }

}
