import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { RequestService } from '../../services/request.service';
import { CheckoutService } from '../../services/checkout.service';
import { Text } from '@angular/compiler';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  resourcesById: Array<any>;
  requestById: Array<any>;
  ordersById: Array<any>;
  salesById: Array<any>;

  fName: string;
  lName: string;
  contactno: string;
  street: string;
  city: string;
  password:string;
  confirm_password:String;
  


  user: any;
  constructor(private authService: AuthService, private router: Router, private resourceService: ResourceService, private requestService: RequestService, private checkoutService: CheckoutService,private validateService: ValidateService,    private flashMessage: FlashMessagesService) {

  }

  ngOnInit() {

    this.user = this.authService.user;
    this.fName = this.user.FName;
    this.lName = this.user.LName;
    this.contactno = this.user.Contactno;
    this.street = this.user.Street_address;
    this.city = this.user.City;

    console.log(this.user);
    this.resourceService.getResourceByCustomerId(this.user.idCustomer).subscribe(data => {
      this.resourcesById = data;
      console.log(this.resourcesById);

      for (var i = 0; i < this.resourcesById.length; i++) {
        this.resourcesById[i].Added_Date = new Date(this.resourcesById[i].Added_Date);
      }
    });

    console.log(this.user);
    this.requestService.getRequestedResourcesBycustomerId(this.user.idCustomer).subscribe(data => {
      this.requestById = data;
      console.log(this.requestById);

      for (var i = 0; i < this.requestById.length; i++) {
        this.requestById[i].Requested_Date = new Date(this.requestById[i].Requested_Date);
      }
    });

    this.checkoutService.ordersByCustomerId(this.user.idCustomer).subscribe(data => {
      this.ordersById = data;
      for (var i = 0; i < this.ordersById.length; i++) {
        this.ordersById[i].order_date = new Date(this.ordersById[i].order_date);
      }
    });

    this.checkoutService.getSellingOrdersBycustomerId(this.user.idCustomer).subscribe(data => {
      this.salesById = data;
      for (var i = 0; i < this.salesById.length; i++) {
        this.salesById[i].sold_date = new Date(this.salesById[i].sold_date);
      }
    });

   
  }


  onOrderView(order: any) {
    this.checkoutService.orderId = order.idOrder;
    this.router.navigate(['/orderview']);
  }


  onUpdateClick(){
    var request={
      FName:this.fName,
      LName:this.lName,
      Contactno:this.contactno,
      Street_address:this.street,
      City:this.city,
      customerid:this.authService.user.idCustomer

    }

    this.authService.updateUserDetails(request).subscribe(data => {
      var res = data;
      console.log(data);
      this.flashMessage.show('Sucessfully updated your details', {cssClass: 'alert-success', timeout: 3000});
    });
    console.log(request);
  }

  onUpdateClickPassword(){
    var request={
      Password:this.password,
      customerid:this.authService.user.idCustomer
    }
    const pass={
      Password: this.password,
      confirm_password:this.confirm_password
    }
   // Validate Password
    if(!this.validateService.validatepassword(pass)) {
      this.flashMessage.show('Password does not match', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.authService.updateUserPassword(request).subscribe(data => {
      var res = data;
      console.log(data);
      this.flashMessage.show('Sucessfully changed your password', {cssClass: 'alert-success', timeout: 3000});

    });
    
}
  
}
