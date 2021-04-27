import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  lastname : string = "";
  firstname : string = "";
  address : string = "";
  zipCode : string = "";
  city : string = "";
  phoneNumber : string = "";
  email : string = "";
  civility : string = "";
  password : string = "";
  confirmPassword : string = "";
  login : string = "";
  country : string = "";

  isFormValid : boolean = false;
  message:string = "";

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  validate() {
    if (this.lastname != "" && this.firstname != "" && this.address != "" && this.zipCode != "" && this.city != "" && this.phoneNumber != "" && this.email != "" && this.civility != "" && this.password != "" && this.confirmPassword != "" && this.login != "" && this.country != "") {
      if (this.password == this.confirmPassword) {
        this.message = "";
        this.isFormValid = true;
        this.signUp();
      }
      else {
        this.message = "Les mots de passe ne sont pas identiques";
        this.isFormValid = false;
      }
    }
    else {
      this.message = "Tous les champs n'ont pas été remplis";
      this.isFormValid = false;
    }
  }

  signUp()
  {
    this.authService.signUp({lastname:this.lastname, firstname:this.firstname, address:this.address, zipCode:this.zipCode,city:this.city,phoneNumber:this.phoneNumber,
      email:this.email,civility:this.civility, login:this.login, password:this.password, country:this.country}).subscribe();
  }
}