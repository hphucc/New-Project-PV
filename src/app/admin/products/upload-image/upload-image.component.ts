import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from './../../../../environments/environment.prod';
declare var $: any;
const token: string = localStorage.getItem('userToken');
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit, OnDestroy {
  public image: any = null;
  public resultUpload={};
  public arrayImage = [];
  fileToUpload = "";
  constructor(
    private router: Router
  ) { }
  //event input
    onFileChange(e) {
      const oFReader = new FileReader();
      const image = e.target.files[0];
      oFReader.readAsDataURL(image);
      oFReader.onload = (oFREvent) => {
        this.fileToUpload = oFREvent.target['result'];
      };
      this.image = image;
    }

  upLoad(){
    if(this.image){
    const token: string = localStorage.getItem('userToken');
    var form_data = new FormData();
    form_data.append('source', this.image)
  $.ajax({
  url : `${environment.apiPV}/api/v1/upload/image`,
  data : form_data,
  headers : {
    'Authorization' : `Bearer ${token}`
  },
  processData: false,
  contentType: false,
  type: 'POST',
  success : data => {
    this.resultUpload = data;
    this.arrayImage.push(this.resultUpload);
  } ,
  error : error => {
    Swal.fire({
      type: 'error',
      title: "Can't Upload Image",
      text: 'Something Is WRONG !',
    })
  }
});
}else{
  Swal.fire({
    type: 'error',
    title: "Can't Upload Image",
    text: 'Image cannot be empty!!',
  })
}
}

copyInputMessage(inputElement){
  inputElement.select();
  document.execCommand('copy');
  inputElement.setSelectionRange(0, 0);
  alert("Copy To Clipboard !");
  this.router.navigateByUrl('/admin');
}
  
  ngOnInit() {
  }
  ngOnDestroy(){
  }
}
