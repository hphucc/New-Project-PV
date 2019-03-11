import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TokenParams } from './../../modules/getToken/Token.class'; //import Model token
import { AuthTokenService } from './../../services/auth-token.service'; //import Token Service
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public error: boolean = false;
  public tokenParam: TokenParams;
  public isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthTokenService
  ) { }

  ngOnInit() {
  }

  login = {};

  onSubmit() {
    this.authService.login(this.login).subscribe(data => {
      localStorage.setItem('userToken', data.token);
      this.isLogged = true;
      this.router.navigate(['admin']);//nếu có tồn tại sẽ đi đến trang Manager 
    }, error => {
      console.log(error);
    });
  }
}
