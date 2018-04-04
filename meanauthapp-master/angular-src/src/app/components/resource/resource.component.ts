import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ResourceService } from '../../services/resource.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/core/src/animation/dsl';
import { FlashMessagesService } from 'angular2-flash-messages';


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
  image: string;

  constructor(rId: number, rName: string, qRequested: number, uPrice: number, desc: string, subcat: string, cat: string, company: string, aq: number, img: string) {
    this.resourceId = rId;
    this.resourceName = rName;
    this.quantityRequested = qRequested;
    this.unitPrice = uPrice;
    this.description = desc;
    this.subCatName = subcat;
    this.catergoryName = cat;
    this.companyName = company;
    this.availableQuantity = aq;
    this.image = img;
  }
}

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  selResource: Resource;
  resourceId: number;
  availableQuantity: number;
  companyName: string;

  qRequested: number;

  constructor(private flashMessage: FlashMessagesService, private route: ActivatedRoute, private router: Router, private resourceService: ResourceService, private shoppingCartService: ShoppingCartService) {
    this.qRequested = 1;
    //this.selResource = this.resourceService.selResource;
    //console.log(this.selResource);
  }

  ngOnInit() {
    console.log(this.selResource);
    this.route.params.subscribe(params => {
      this.resourceId = +params['id'];
      console.log(this.resourceId);

      this.resourceService.getResourceById(this.resourceId).subscribe(data => {
        var res = data[0];
        console.log(data[0].Image);
        this.selResource = new Resource(res.idResource, res.ResourceName, 1, res.UnitPrice, res.Description, res.SubCatName, res.CatergoryName, data[0].Company_Name, res.Quantity, data[0].Image);;
        this.selResource.image = "http://localhost:8080/api/image/" + this.selResource.image;
        console.log(this.selResource);
      });
      /*
      if(!this.selResource){
        this.router.navigate(['/store']);
      }*/

    });

  }


  addToCart() {

    this.selResource.quantityRequested = this.qRequested;
    this.selResource.availableQuantity = this.selResource.availableQuantity - this.selResource.quantityRequested;
    this.shoppingCartService.newResource(new Resource(this.selResource.resourceId, this.selResource.resourceName, this.selResource.quantityRequested, this.selResource.unitPrice, this.selResource.description, this.selResource.subCatName, this.selResource.catergoryName, this.selResource.companyName, this.selResource.availableQuantity, this.selResource.image));
    this.flashMessage.show('Added To Cart!', { cssClass: 'alert-success', timeout: 5000 });
    //this.availableQuantity = this.selResource.availableQuantity
    this.resourceService.updateAvailableQuantity(this.resourceId, this.selResource.availableQuantity).subscribe(data => {
      var res = data;
      //this.selResource=new Resource(res.idResource,res.ResourceName,1,res.UnitPrice,res.Description,res.SubCatName,res.CatergoryName,res.Comapny_Name,res.Quantity);;
      console.log(data);
    });

  }

  qUp() {
    this.qRequested++;
  }
  qDown() {
    if (this.qRequested != 1)
      this.qRequested--;
  }
}
