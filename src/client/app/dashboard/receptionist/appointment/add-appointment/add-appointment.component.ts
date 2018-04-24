import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../shared/api.service';


import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  patients: Observable<Array<any>>;
  doctors: Observable<Array<any>>;

  selectedDoctor: any;
  selectedPatient: any;
  selectedDate: Date;

  constructor(private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private flashMessagesService: FlashMessagesService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.doctorPatientDataFetcher();
  }

  doctorPatientDataFetcher() {
    this.api.get('/patientsList').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(5).map(i => data);
    });

    this.api.get('/doctorsList').subscribe(data => {
      this.doctors = data;
    });
  }

  addAppointment() {

    if(!this.selectedDoctor || !this.selectedDoctor || !this.selectedPatient){
      this.flashMessagesService.show('Please, Fill all the required fields', {
        classes: ['alert', 'alert-success'], // You can pass as many classes as you need
        timeout: 2000, // Default is 3000
      });
      return false;
    }

    const payload = {
      patientFirstName: this.selectedPatient.firstname,
      patientLastName: this.selectedPatient.lastname,
      doctorFirstName: this.selectedDoctor.firstname,
      doctorLastName: this.selectedDoctor.lastname,
      appointmentDate: this.selectedDate,
      status: "pending"
    }
    this.api.post("/addAppointment", payload).subscribe(data => {

      if (data.error) {
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      } else if (data.message) {
        this.toastr.success(data.message, 'Great !', { toastLife: 3000 });
      }

    })
  }
}
