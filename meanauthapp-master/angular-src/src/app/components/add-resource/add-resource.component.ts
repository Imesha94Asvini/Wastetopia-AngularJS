import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FlashMessagesService } from 'angular2-flash-messages';

const URL = 'http://localhost:8080/api/uploadimg';


class AddResource {
  resourceId: number;
  resourceName: string;
  quantityRequested: number;

  constructor(rId: number, rName: string, qRequested: number) {
    this.resourceId = rId;
    this.resourceName = rName;
    this.quantityRequested = qRequested;



  }
}



@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})

export class AddResourceComponent implements OnInit {
  selCat: string;
  subCat: Array<any>;

  check: boolean;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  itemName: string;
  selSubCat: string;
  quantity: number;
  price: number;
  subCatId: number;
  description: string;
  image: string

  constructor(private flashMessage: FlashMessagesService, private resourceService: ResourceService, private authService: AuthService, private router: Router) { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {
    this.check = false;
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  getSubCat() {
    console.log(this.selCat);
    this.resourceService.getSubCategory(this.selCat).subscribe(data => {
      this.subCat = data;
      console.log(this.subCat);
      this.selSubCat = this.subCat[0].SubCatName;
      this.test();
    });
  }

  test() {

    for (var i = 0; i < this.subCat.length; i++) {
      if (this.subCat[i].SubCatName == this.selSubCat) {
        this.subCatId = this.subCat[i].idSubCatergory;
      }
    }

    console.log(this.subCatId);
  }

  onAddClick() {

    if (this.itemName == undefined || this.quantity == undefined || this.price == undefined || this.description == undefined || this.subCatId == undefined) {
      this.flashMessage.show('Fill all fields', { cssClass: 'alert-danger', timeout: 9000 });
    }

    else {
      var add = {
        ResourceName: this.itemName,
        Quantity: this.quantity,
        UnitPrice: this.price,
        Description: this.description,
        SubCatergory_idSubCatergory: this.subCatId,
        customer_idCustomer: this.authService.user.idCustomer

      }
      console.log(add);
      this.resourceService.newResource(add).subscribe(data => {
        console.log(data);
        if (data.success) {
          this.resourceService.addedResourceId = data.idResource;
          this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
            form.append('resourceId', data.idResource);
          };
          this.uploader.uploadAll();
          this.router.navigate(['addedsuccess']);
        }
        else {
          this.router.navigate(['addedfailure']);

        }
      });

    }

  }
}
