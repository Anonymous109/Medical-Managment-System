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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {


  constructor(private dataService: AdminDataFetcherService,
    private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef, private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  patients: Observable<Array<any>>;
  doctors: Observable<Array<any>>;
  assignedDoctorFirstName: string;
  assignedDoctorLastName: string;

  patientToBeAssignedFirstName: string;
  patientToBeAssignedLastName: string;
  patientToBeAssignedGender: string;
  patientToBeAssignedAge: number;

  selectedValue: any;

  doctorPatientDataFetcher() {
    this.api.get('/patientRequestingTakeVitalSign').subscribe(data => {
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
  takeVitalSign(patientDisplay: Patient) {

    this.router.navigate(['/nurse/takeVitalSign/' + patientDisplay.firstname + "/" + patientDisplay.lastname]);

  }
}
