import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if(user.FName == undefined || user.LName == undefined || user.Username == undefined || user.Password == undefined || user.Contactno == undefined || user.Company_Name == undefined || user.Street_address == undefined || user.City == undefined) {
        return false;
    } else {
      return true;
    }
  }
  validatepassword(pass) {
    if(pass.Password==pass.confirm_password) {
        return true;
    } else {
      return false;
    }
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
