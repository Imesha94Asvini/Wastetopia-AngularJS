import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  FName: String;
  LName: String;
  Username: String;
  confirm_password:String;
  Password: String;
  Contactno:String;
  Company_Name:String;
  Street_address:String;
  City:String;

  
  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      FName: this.FName,
      LName: this.LName,
      Username: this.Username,
      Password: this.Password,
      Contactno: this.Contactno,
      Company_Name: this.Company_Name,
      Street_address: this.Street_address,
      City: this.City,
    
    }
    const pass={
      Password: this.Password,
      confirm_password:this.confirm_password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.Username)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

     // Validate Password
    if(!this.validateService.validatepassword(pass)) {
      this.flashMessage.show('password not same', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    
    }
  });
  }
}
