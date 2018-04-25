import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../shared/api.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';


@Component({
  selector: 'app-add-bed',
  templateUrl: './add-bed.component.html',
  styleUrls: ['./add-bed.component.css']
})
export class AddBedComponent implements OnInit {

  selectedBedType:any;
  selectedBedNumber:number;
  bedDescription:string;

  bedTypes: Observable<Array<any>>;
  constructor(private api: ApiService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
            ) {
              this.toastr.setRootViewContainerRef(vcr);
             }

  ngOnInit() {
    this.api.get('/getBedTypes').subscribe(data => {
      this.bedTypes = Observable.interval(10).map(i => data);
    });
  }

  addBed(){
      const payload = {
        bedNumber: this.selectedBedNumber,
        bedType: this.selectedBedType,
        bedDescription: this.bedDescription,
        status: "free"
      }

      this.api.post('/addBed',payload).subscribe(data => {
          if(data.error){
            this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
            return false;
          }
          this.toastr.success(data.message, 'Great !', { toastLife: 3000 });
      });
  }
}
