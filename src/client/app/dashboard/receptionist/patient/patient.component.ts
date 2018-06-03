import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Patient } from '../../../shared/patient.model';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {


  constructor(private dataService: AdminDataFetcherService,
    private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
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

  ngOnInit() {
    this.doctorPatientDataFetcher();
  }

  //Assign Patient to Doctor
  assignDoctor(patientDisplay: Patient) {


    this.assignedDoctorFirstName = this.selectedValue.firstname;
    this.assignedDoctorLastName = this.selectedValue.lastname;
    this.patientToBeAssignedFirstName = patientDisplay.firstname;
    this.patientToBeAssignedLastName = patientDisplay.lastname;
    this.patientToBeAssignedGender = patientDisplay.gender;
    this.patientToBeAssignedAge = patientDisplay.age;

    const payload = {
      patientFirstName: this.patientToBeAssignedFirstName,
      patientLastName: this.patientToBeAssignedLastName,
      patientAge: this.patientToBeAssignedAge,
      patientGender: this.patientToBeAssignedGender,
      assignedDoctorFirstName: this.assignedDoctorFirstName,
      assignedDoctorLastName: this.assignedDoctorLastName,
      status: "unadmitted"
    };

    this.api.post('/assignDoctor', payload).subscribe(data => {
      if (data.error) {
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }
      if (data.message) {
        this.toastr.success(data.message, 'Great !', { toastLife: 3000 });
      }
      this.doctorPatientDataFetcher();
    });

  }

  doctorPatientDataFetcher() {
    this.api.get('/patientsList').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(100).map(i => data);
    });

    this.api.get('/doctorsList').subscribe(data => {
      this.doctors = data;
    });
  }
}
