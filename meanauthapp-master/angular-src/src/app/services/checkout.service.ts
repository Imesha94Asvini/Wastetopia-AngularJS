import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class CheckoutService {
  orderId:Number;
  
  constructor(private http: Http) { }


  newOrder(order:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/neworder', order, { headers: headers })
      .map(res => res.json());
  }
  ordersByCustomerId(customerid:number){
    console.log(customerid);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "customerid":customerid
    };
    return this.http.post('http://localhost:8080/api/getordersbyCustomerid',body,{headers: headers}).map(res => res.json());
  }

  getSellingOrdersBycustomerId(customerid:number){
    console.log(customerid);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "customerid":customerid
    };
    return this.http.post('http://localhost:8080/api/getsellingordersbyCustomerid',body,{headers: headers}).map(res => res.json());
  }

  getOrderByOrderId(orderId:Number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "orderid":orderId
    };
    return this.http.post('http://localhost:8080/api/getorderbyorderid',body,{headers: headers}).map(res => res.json());

  }

}
