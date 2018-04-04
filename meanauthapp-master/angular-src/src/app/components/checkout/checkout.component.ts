import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { CheckoutService } from '../../services/checkout.service'
declare var paypal : any;

class Resource {
  resourceId: number;
  resourceName: string;
  quantityRequested: number;
  unitPrice: number;

  constructor(rId: number, rName: string, qRequested: number, uPrice: number) {
    this.resourceId = rId;
    this.resourceName = rName;
    this.quantityRequested = qRequested;
    this.unitPrice = uPrice;



  }
}
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  shoppingCartArray: Array<Resource>;
  total: number;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryPhone: string
  user:any;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private authService: AuthService,private checkoutService:CheckoutService) {
    this.shoppingCartArray = this.shoppingCartService.shoppingCartArray;
  }

  ngOnInit() {
    this.calTotal();
    this.user=this.authService.user;
    if(!this.user)
    this.router.navigate(['login']);

    if (this.shoppingCartService.shoppingCartArray.length == 0)
      this.router.navigate(['store']);

    console.log(this.user);
  }

  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: 'sandbox',
    client: {
      sandbox: 'AS4P3C46AZ6XSD8KVb9NvUYIZN-_PH5vcp5mpoBl6RpUGw_rwD1JGMcZ3BoVz1gPxIZPFVeo_H4G_5CM',
      production: 'xxxxxxxxxx'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.total, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        // show success page
        this.router.navigate(['orderplaced']);
      });
    }
  };

  public ngAfterViewChecked(): void {
    if(!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  calTotal() {
    this.total = 0;
    for (var i = 0; i < this.shoppingCartArray.length; i++) {
      this.total += this.shoppingCartArray[i].unitPrice * this.shoppingCartArray[i].quantityRequested;
    }

  }

  onCheckout(){
    
    var order={
      customer_idCustomer:this.user.idCustomer,
      City:this.deliveryCity,
      Street_address:this.deliveryAddress,
      TotalPrice:this.total,
      Payment_Id:"#123",
      order_items:this.shoppingCartArray
    };
    //console.log(order);
    this.checkoutService.newOrder(order).subscribe(data=>{
      if(data.success){
        this.checkoutService.orderId=data.orderId;
        this.shoppingCartService.shoppingCartArray=[];
        this.router.navigate(['orderplaced']);
        
      }
      else{
        this.router.navigate(['orderfailure']);
      }
    });

  }

}
