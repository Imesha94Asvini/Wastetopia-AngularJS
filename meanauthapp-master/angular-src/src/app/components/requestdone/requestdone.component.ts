import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service'

@Component({
  selector: 'app-requestdone',
  templateUrl: './requestdone.component.html',
  styleUrls: ['./requestdone.component.css']
})
export class RequestdoneComponent implements OnInit {
  requestId:string;
  constructor(private requestService:RequestService) { }

  ngOnInit() {
    this.requestId= this.requestService.requestId;
  }


}
