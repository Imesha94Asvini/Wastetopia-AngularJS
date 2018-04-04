import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  countUsers: Array<any>;
  countAvailableItems: Array<any>;
  countRequestedItems: Array<any>;
  countMatchesMade: Array<any>;
  topBuyer: Array<any>;
  topSeller: Array<any>;


  constructor(private dashboardService:DashboardService) { }

  ngOnInit() {

    this.dashboardService.getNoOfUsers().subscribe(data=>{
      this.countUsers=data;
      for(var i=0;i<this.countUsers.length;i++){
        this.countUsers[i];
        console.log(this.countUsers[i]);
      }
   });

    this.dashboardService.getAvailableItems().subscribe(data=>{
      this.countAvailableItems=data;
      for(var i=0;i<this.countAvailableItems.length;i++){
        this.countAvailableItems[i];
        console.log(this.countAvailableItems[i]);
      }
   });

    this.dashboardService.getRequestedItems().subscribe(data=>{
      this.countRequestedItems=data;
      for(var i=0;i<this.countRequestedItems.length;i++){
        this.countRequestedItems[i];
        console.log(this.countRequestedItems[i]);
      }
    });

    this.dashboardService.getNoOfMatches().subscribe(data=>{
      this.countMatchesMade=data;
      for(var i=0;i<this.countMatchesMade.length;i++){
        this.countMatchesMade[i];
        console.log(this.countMatchesMade[i]);
      }
    });

    this.dashboardService.getTopBuyerByCustomerId().subscribe(data=>{
      this.topBuyer=data;
      for(var i=0;i<this.topBuyer.length;i++){
        this.topBuyer[i];
        console.log(this.topBuyer[i]);
      }
    });

    this.dashboardService.getTopSellerByCustomerId().subscribe(data=>{
      this.topSeller=data;
      for(var i=0;i<this.topSeller.length;i++){
        this.topSeller[i];
        console.log(this.topSeller[i]);
      }
    });
  }

}
