import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import { ResourceService } from '../../services/resource.service';

class Resource{
  resourceId:number;
  resourceName:string;
  quantityRequested:number;
  unitPrice:number;

  constructor(rId:number,rName:string,qRequested:number,uPrice:number){
    this.resourceId=rId;
    this.resourceName=rName;
    this.quantityRequested=qRequested;
    this.unitPrice=uPrice;
  }
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCartArray:Array<Resource>;
  total:number;
  constructor(private shoppingCartService:ShoppingCartService,private resourceService: ResourceService) {
    this.shoppingCartArray=this.shoppingCartService.shoppingCartArray;
    
   }

  ngOnInit() {
    this.calTotal();
    console.log("");
    console.log(this.shoppingCartArray);
  }

  qUp(res:any){
    res.quantityRequested++;
    this.resourceService.updateAvailableQuantity(res.resourceId,--res.availableQuantity).subscribe(data=>{
      var res=data;
      //this.selResource=new Resource(res.idResource,res.ResourceName,1,res.UnitPrice,res.Description,res.SubCatName,res.CatergoryName,res.Comapny_Name,res.Quantity);;
      console.log(data);
    });
    this.calTotal();
  }
  qDown(res:any){
    if(res.quantityRequested!=1){
      res.quantityRequested--;
      this.resourceService.updateAvailableQuantity(res.resourceId,++res.availableQuantity).subscribe(data=>{
        var res=data;
        //this.selResource=new Resource(res.idResource,res.ResourceName,1,res.UnitPrice,res.Description,res.SubCatName,res.CatergoryName,res.Comapny_Name,res.Quantity);;
        console.log(data);
      });
      this.calTotal();
    }

  }

  removeResource(res:any){
    this.shoppingCartService.removeResourcce(res);
    this.calTotal();
  }

  calTotal(){
    this.total=0;
    for(var i=0;i<this.shoppingCartArray.length;i++){
      this.total+=this.shoppingCartArray[i].unitPrice*this.shoppingCartArray[i].quantityRequested;
    
    }
    console.log("yrretrjt");
    console.log(this.shoppingCartArray);
  }


}
