import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ResourceService } from '../services/resource.service';

class Resource {
  resourceId: number;
  resourceName: string;
  quantityRequested: number;
  unitPrice: number;
  description: string;
  subCatName: string;
  catergoryName: string;
  companyName: string;
  availableQuantity: number;

  constructor(rId: number, rName: string, qRequested: number, uPrice: number, desc: string, subcat: string, cat: string, company: string, aq: number) {
    this.resourceId = rId;
    this.resourceName = rName;
    this.quantityRequested = qRequested;
    this.unitPrice = uPrice;
    this.description = desc;
    this.subCatName = subcat;
    this.catergoryName = cat;
    this.companyName = company;
    this.availableQuantity = aq;
  }
}


@Injectable()
export class ShoppingCartService {

  shoppingCartArray: Array<Resource>;

  constructor(private resourceService: ResourceService) {
    this.shoppingCartArray = [];
  }




  newResource(res: Resource) {
    
  

    var index=-1;
    for(var i=0;i<this.shoppingCartArray.length;i++){
      if(this.shoppingCartArray[i].resourceId==res.resourceId){
        index=i;
      }
    }
    if(index!=-1){
      console.log(res.quantityRequested);
      this.shoppingCartArray[index].quantityRequested+=res.quantityRequested;
      this.shoppingCartArray[index].availableQuantity=res.availableQuantity;
    }
    else{
      this.shoppingCartArray.push(res);
    }
  }

  removeResourcce(res: Resource) {
    var index = this.shoppingCartArray.indexOf(res, 0);
    console.log("remove:");
    console.log(res);
    this.resourceService.updateAvailableQuantity(res.resourceId,res.availableQuantity+res.quantityRequested).subscribe(data=>{
      console.log(data);
    });
    if (index > -1) {
      this.shoppingCartArray.splice(index, 1);
    }
  }

}
