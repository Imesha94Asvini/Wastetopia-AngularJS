import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {ShoppingCartService} from '../../services/shopping-cart.service'
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
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  shoppingCartArray:Array<Resource>;
  isLoggedIn:boolean;
  searchStr:string;
  constructor(private resourceService:ResourceService,
    private authService: AuthService,private router: Router,private flashMessage: FlashMessagesService,private shoppingCartService:ShoppingCartService) {
      this.shoppingCartArray=this.shoppingCartService.shoppingCartArray;
     }

  ngOnInit() {
    this.isLoggedIn=this.authService.isLoggedIn();
    this.searchStr="";
  }

  

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/home']);
  }

  search(){
    //console.log(this.searchStr);
    this.resourceService.setSearch(this.searchStr);
    this.router.navigate(['/store']);
  }
}
