import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent implements OnInit {
  orderId:Number;
  user:any;
  orderDetails:Array<any>;
  constructor(private authService:AuthService, private checkoutService:CheckoutService) { }

  ngOnInit() {
    this.orderId=this.checkoutService.orderId;
    this.checkoutService.getOrderByOrderId(this.orderId).subscribe(data=>{
      this.orderDetails=data;
      console.log(data);
    });
  }

}
