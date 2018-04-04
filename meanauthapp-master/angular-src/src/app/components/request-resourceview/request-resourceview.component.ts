import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Router} from "@angular/router";




@Component({
  selector: 'app-request-resourceview',
  templateUrl: './request-resourceview.component.html',
  styleUrls: ['./request-resourceview.component.css']
})
export class RequestResourceviewComponent implements OnInit {
 
  req:any;

  constructor(private requestService:RequestService,private router:Router) { }

  ngOnInit() {
    this.req=this.requestService.request;
    console.log(this.req);
  } 



}
