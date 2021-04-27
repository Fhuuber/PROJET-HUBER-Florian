import { Component, OnInit } from '@angular/core';
import { Users } from '../model/users';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : string = "";
  password : string = "";
  isFormValid : boolean = false;
  message:string = "";

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  validate() {
    if (this.login != "" && this.password != "") {
        this.message = "";
        this.isFormValid = true;
        this.signIn();
    }
    else {
      this.message = "Tous les champs n'ont pas été remplis";
      this.isFormValid = false;
    }
  }

  signIn()
  { 
    this.authService.login({login:this.login, password:this.password}).subscribe();
  }
}