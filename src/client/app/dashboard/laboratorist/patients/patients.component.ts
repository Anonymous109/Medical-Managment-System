import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Patient } from '../../../shared/patient.model';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { forkJoin } from "rxjs/observable/forkJoin";

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Observable<Array<any>>;
  
  constructor(private dataService: AdminDataFetcherService,
    private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef, private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  doctorPatientDataFetcher() {
    this.api.get('/patientRequestingLab').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(10).map(i => data);
    });
  }

  ngOnInit() {

    this.doctorPatientDataFetcher();
  }

  refresh() {
    this.doctorPatientDataFetcher();
  }
  

  //Assign Patient to Doctor
  takeLab(patientDisplay: Patient) {

    const payload = {
      firstname : patientDisplay.firstname,
      lastname : patientDisplay.lastname
    }

    this.api.post('/getPatientInfoDetail', payload).subscribe(data=>{
      if(data.error){
        console.log(data.error);
      }else{
        this.router.navigate(['/labratorist/takeLab/' + data.patientId]);
      }

    });
    

  }
}
