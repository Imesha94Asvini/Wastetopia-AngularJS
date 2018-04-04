import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';



@Injectable()
export class RequestService {
  requestId:string;
  request:any;
  constructor(private http: Http) { }

  newRequest(request:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/newrequest', request, { headers: headers })
      .map(res => res.json());
  }

  getRequestedResourcesBycustomerId(customerid:number){
    console.log(customerid);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "customerid":customerid
    };
    return this.http.post('http://localhost:8080/api/getrequestedresourcesbyCustomerid',body,{headers: headers}).map(res => res.json());
  }
}
