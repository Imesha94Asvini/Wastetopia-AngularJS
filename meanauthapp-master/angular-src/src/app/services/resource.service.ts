import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

class Resource{
  resourceId:number;
  resourceName:string;
  quantityRequested:number;
  unitPrice:number;
  description:string;
  subCatName:string;
  catergoryName:string;
  companyName:string;
  availableQuantity:number;

  constructor(rId:number,rName:string,qRequested:number,uPrice:number,desc:string,subcat:string,cat:string,company:string,aq:number){
    this.resourceId=rId;
    this.resourceName=rName;
    this.quantityRequested=qRequested;
    this.unitPrice=uPrice;
    this.description=desc;
    this.subCatName=subcat;
    this.catergoryName=cat;
    this.companyName=company;
    this.availableQuantity=aq;
  }
}
//request resource view
class Reqresource{
  reqResourceId:number;
  reqResourceName:String;
  reqQuantity:number;
  description:String;
  subCatName:string;
  fName:String;
  lName:String;


  constructor(reqId:number,reqName:string,qRequested:number,desc:string,subcat:string,company:string,rq:number,fname:string,lname:string){
    this.reqResourceId=reqId;
    this.reqResourceName=reqName;
    this.reqQuantity=qRequested;
    this.description=desc;
    this.subCatName=subcat;
    this.fName=fname;
    this.lName=lname;

  }
}


@Injectable()
export class ResourceService {
  selResource:Resource;
  addedResourceId:string;
  reqResource:Reqresource;
  
  private searchStrSource = new Subject<string>();
  searchStr$=this.searchStrSource.asObservable();

  constructor(private http: Http) { 
    
  }
 
  setSearch(str:string){
    this.searchStrSource.next(str);
  }

  selectResource(res: Resource) {
    this.selResource=res;
  }
  selectReqResource(res: Reqresource) {
    this.reqResource=res;
  }

  getResources(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/resourceList').map(res => res.json());
  } 

  getResourceById(rid:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "resourceId":rid
    };
    return this.http.post('http://localhost:8080/api/getresourcebyid',body,{headers: headers}).map(res => res.json());
  }

  getReqResources(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/requestedList').map(res => res.json());
  }
  getCatergory(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/api/getCategories').map(res => res.json());
  }

  getSubCategory(cat:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "cat":cat
    };
    return this.http.post('http://localhost:8080/api/getsubcategories',body,{headers: headers}).map(res => res.json());
  }



  newResource(resource:any){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/newresource', resource, { headers: headers })
      .map(res => res.json());
  }

  getResourceByCustomerId(customerid:number){
    console.log(customerid);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body={
      "customerid":customerid
    };
    return this.http.post('http://localhost:8080/api/getresourcesbyCustomerid',body,{headers: headers}).map(res => res.json());
  }

  updateAvailableQuantity(idResource:number, availableQuantity:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(availableQuantity);
    const body={
      "idResource":idResource,
      "availableQuantity":availableQuantity
    };
    return this.http.post('http://localhost:8080/api/updateAvailableQuantity',body,{headers: headers}).map(res => res.json());
  }

}

