import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'ngx-flash-messages';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';


@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {


  patientProfile:any;
  date:Date = new Date();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private flashMessagesService: FlashMessagesService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) { 

      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    let patientId = this.route.snapshot.paramMap.get('patientId');
    const payload = {
      patientId: patientId
    }
    this.api.post('/getFromPatientRecord', payload).subscribe(data=>{
      this.patientProfile = data.patientInfo;
    });
  }

  checkup()
  {
      this.addPatient();
  }

  addPatient()
  {
    this.api.post('/addRevisitingPatient', this.patientProfile).subscribe(data => {
      if(data.error){
        this.toastr.error( data.error, 'Message', {toastLife: 4000});
        return false;
      }
      this.toastr.success(data.status,'Message', {toastLife: 4000});
      this.payRegistraionFee();
    });
    return;
  }

  payRegistraionFee()
  {
    const paymentPayload = {
      patientId : this.patientProfile.patientId,
      paymentReason : "Revist for Checkup",
      paymentOn: this.date.toDateString(),
      amount : 100,
      status : "unpaid" 
    } 
    this.api.post('/addIntoInvoice',paymentPayload).subscribe(data2=>{
      if(data2.error){
        this.toastr.success( data2.error, 'Message', {toastLife: 4000});
        return false;
      }
    });
  }
}
