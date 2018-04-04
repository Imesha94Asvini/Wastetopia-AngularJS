import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  getNoOfUsers(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/getnoofusers', { headers: headers })
      .map(res => res.json());
  }

  getAvailableItems(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/getavailableitems', { headers: headers })
      .map(res => res.json());
  }

  getRequestedItems(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/getrequesteditems', { headers: headers })
      .map(res => res.json());
  }

  getNoOfMatches(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/getnoofmatches', { headers: headers })
      .map(res => res.json());
  }

  getTopBuyerByCustomerId(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/gettopbuyer', { headers: headers })
      .map(res => res.json());
  }
  
  getTopSellerByCustomerId(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/gettopseller', { headers: headers })
      .map(res => res.json());
  }
}


