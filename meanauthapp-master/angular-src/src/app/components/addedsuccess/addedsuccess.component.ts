import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service'

@Component({
  selector: 'app-addedsuccess',
  templateUrl: './addedsuccess.component.html',
  styleUrls: ['./addedsuccess.component.css']
})
export class AddedsuccessComponent implements OnInit {
  resourceId:string;

  constructor(private resourceService:ResourceService) { }

  ngOnInit() {
    this.resourceId= this.resourceService.addedResourceId;
  }

}
