import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Router } from "@angular/router";
import { RequestService } from '../../services/request.service';

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

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  resArray: Array<any>;
  searchArray: Array<any>;
  reqResArray: Array<any>;
  catArray: Array<any>;
  shoppingCartArray: Array<Resource>;
  constructor(private requestService: RequestService, private resourceService: ResourceService, private shoppingCartService: ShoppingCartService, private router: Router) {

  }


  ngOnInit() {

    this.resourceService.getResources().subscribe(data => {
      this.searchArray = [];
      this.resArray = data;


      for (var i = 0; i < this.resArray.length; i++) {
        this.resArray[i].Image = "http://localhost:8080/api/image/" + this.resArray[i].Image;
      }
      console.log(this.resArray);
    });
    this.resourceService.getReqResources().subscribe(data => {

      this.reqResArray = data;
    });
    this.resourceService.getCatergory().subscribe(data => {

      this.catArray = data;
    });

    this.resourceService.searchStr$.subscribe(searchStr => {
      this.resourceService.getResources().subscribe(data => {
        this.searchArray = [];
        this.resArray = data;


        if (searchStr != "") {
          for (var i = 0; i < this.resArray.length; i++) {
            
              console.log(this.resArray[i].ResourceName.indexOf(searchStr));
            if(this.resArray[i].ResourceName.toLowerCase().indexOf(searchStr)!="-1"){
              this.searchArray.push(this.resArray[i]);
            }
            
          }
          this.resArray = this.searchArray;
        }

        for (var i = 0; i < this.resArray.length; i++) {
          this.resArray[i].Image = "http://localhost:8080/api/image/" + this.resArray[i].Image;
        }
        console.log(this.resArray);
      });
      this.resourceService.getReqResources().subscribe(data => {

        this.reqResArray = data;
      });
      this.resourceService.getCatergory().subscribe(data => {

        this.catArray = data;
      });

    });
  }

  selectRes(res: any) {
    var r = new Resource(res.idResource, res.ResourceName, 1, res.UnitPrice, res.Description, res.SubCatName, res.CatergoryName, res.Comapny_Name, res.Quantity);
    this.resourceService.selectResource(r);
    this.router.navigate(['/resource', r.resourceId]);
  }

  catSelect(cat: any) {
    console.log(cat);
    var arr = [];
    this.resourceService.getResources().subscribe(data => {

      this.resArray = data;
      for (var i = 0; i < this.resArray.length; i++) {

        if (this.resArray[i].CatergoryName == cat.CatergoryName) {

          arr.push(this.resArray[i]);
        }
      }
      this.resArray = arr;

    });


  }

  selectReq(req: any) {
    console.log(req);
    this.requestService.request = req;
    this.router.navigate(['/request-resourceview']);
  }

  selectAll() {
    this.resourceService.getResources().subscribe(data => {
      this.resArray = data;
    });
  }

}
