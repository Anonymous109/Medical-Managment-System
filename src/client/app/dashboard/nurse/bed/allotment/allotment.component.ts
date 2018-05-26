import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FlashMessagesService } from 'ngx-flash-messages';

import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';


import { AllocatedBed } from '../../../../shared/allocatedbed.model';

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css']
})
export class AllotmentComponent implements OnInit {

  
  //Observable for Asyncronous Data Loading
  beds: Observable<Array<any>>;
  
  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllotments();
  }

  refresh()
  {
    this.getAllotments();
  }

  getAllotments(){

    this.api.get('/getReservedBeds').subscribe(data=>{
      this.beds = Observable.interval(10).map(i => data);
    });
  }

  discharge(bedsDisplay:any)
  { 
    const payload = {
      bedNumber: bedsDisplay.bedNumber
    };
    
    this.api.post('/discharge',bedsDisplay).subscribe(data=>{
      if(data.status)
      {
        this.toastr.success(data.status, 'Message', { toastLife: 3000 });
        //this.payBedFee(bedsDisplay);
        const payload = {
          firstname: bedsDisplay.patientFirstName,
          lastname: bedsDisplay.patientLastName
        }

        console.log(payload);

        var paymentTime = new  Date();
        this.api.post('/getPatientId', payload).subscribe(data=>{

          console.log("get allocatedDAe " + data.allocatedTime);

          const paymentPayload = {
            patientId : data.result,
            paymentReason : "Payment for Bed",
            paymentOn: paymentTime.toDateString(),
            amount : 200,
            status : "unpaid" 
          }
          this.api.post('/addIntoInvoice',paymentPayload).subscribe(data2=>{
            if(data2.error){
              this.toastr.error( data2.error, 'Message', {toastLife: 4000});
              return false;
            }
            this.toastr.success( data2.status, 'Message', {toastLife: 4000});
          });
        });
      }
    });
  }

}
