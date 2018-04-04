import { Component, OnInit } from '@angular/core';
import {CheckoutService} from '../../services/checkout.service'

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.css']
})


export class OrderplacedComponent implements OnInit {
  orderId:Number;
  constructor(private checkoutService:CheckoutService) { 
    
  }

  ngOnInit() {
    this.orderId= this.checkoutService.orderId;
  }

}
