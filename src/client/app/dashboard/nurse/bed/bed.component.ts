import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';



@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit {

  beds: Observable<Array<any>>;
  
  constructor(private api:ApiService,
              public toastr: ToastsManager,
              vcr: ViewContainerRef
            ) {
              this.toastr.setRootViewContainerRef(vcr);
             }

  ngOnInit() {
    this.getBeds();
  }

  getBeds(){
    this.api.get('/beds').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.beds = Observable.interval(10).map(i => data);
    });
  }

  removeBed(bedsDisplay:any){
      const payload = {
        bedNumber: bedsDisplay.bedNumber
      };
      this.api.post('/removeBed', payload).subscribe(data => {
          if(data.message){
            this.toastr.success(data.message, 'Great !', { toastLife: 3000 });
          }
          this.getBeds();
      });
  }
}
