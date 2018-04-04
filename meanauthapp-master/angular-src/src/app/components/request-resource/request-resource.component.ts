import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import { AuthService } from '../../services/auth.service';
import {RequestService} from '../../services/request.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


class Request {
  requestId: number;
  resourceName: string;
  quantityRequested: number;
  reqdescription:string;

  constructor(rId: number, rName: string, qRequested: number,qdescription:string) {
    this.requestId = rId;
    this.resourceName = rName;
    this.quantityRequested = qRequested;
    this.reqdescription=qdescription;


  }
}


@Component({
  selector: 'app-request-resource',
  templateUrl: './request-resource.component.html',
  styleUrls: ['./request-resource.component.css']
})


export class RequestResourceComponent implements OnInit {
 

  selCat:string;
  subCat:Array<any>;

  check: boolean;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  itemName:string;
  selSubCat:string;
  quantity:number;
  description:string;
  subCatId:number;
  constructor(private flashMessage: FlashMessagesService, private resourceService:ResourceService,private authService: AuthService, private requestService:RequestService,private router:Router) { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
  }
  getSubCat(){
    console.log(this.selCat);
    this.resourceService.getSubCategory(this.selCat).subscribe(data=>{
      this.subCat=data;
      console.log(this.subCat);
      this.selSubCat=this.subCat[0].SubCatName;
      this.test();
    });
  }

  test(){
    
    for(var i=0;i<this.subCat.length;i++){
      if(this.subCat[i].SubCatName==this.selSubCat){
        this.subCatId=this.subCat[i].idSubCatergory;
      }
    }

    console.log(this.subCatId);
  }
  
  onRequestClick(){

    if (this.itemName == undefined || this.quantity == undefined || this.description == undefined || this.subCatId == undefined) {
      this.flashMessage.show('Fill all fields', { cssClass: 'alert-danger', timeout: 9000 });
    }
  
  
  else {
    var request={
      Req_Resource_Name:this.itemName,
      Req_Quantity:this.quantity,
      Description:this.description,
      Status:'Requested',
      SubCatergory_idSubCatergory:this.subCatId,
      customer_idCustomer:this.authService.user.idCustomer

    }
    console.log(request);
    this.requestService.newRequest(request).subscribe(data=>{
      if(data.success){
        this.requestService.requestId=data.requestId;
        this.router.navigate(['requestdone']);
        
      }
      else{
        this.router.navigate(['requestfailure']);
      }

    });

  }
}
}
