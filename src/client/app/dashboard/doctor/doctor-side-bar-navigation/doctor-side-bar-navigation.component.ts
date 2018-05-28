import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-side-bar-navigation',
  templateUrl: './doctor-side-bar-navigation.component.html',
  styleUrls: ['./doctor-side-bar-navigation.component.css']
})
export class DoctorSideBarNavigationComponent implements OnInit {

  username: String;
  appointments: Observable<Array<any>>;
  prescription: Observable<Array<any>>;
  patients: Observable<Array<any>>;
  bedAllotments: Observable<Array<any>>;

  constructor(private api:ApiService, private auth : AuthService, private router: Router) { }

  ngOnInit() {

    this.api.get('/appointmentsList').subscribe(data=>{
      this.appointments = Observable.interval(100).map(i=>data);
    });

    this.api.get('/prescriptionList').subscribe(data=>{
      this.prescription = Observable.interval(100).map(i => data);
    })

    this.api.get('/patientsList').subscribe(data=>{
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(100).map(i=>data);
    });

    this.api.get('/getReservedBeds').subscribe(data => {
      this.bedAllotments = Observable.interval(10).map(i => data);
    });

    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.username = data.user; 
    });
    this.getPendingAppointments();
  }

  approvedAppointments()
  {
    this.router.navigate(['/doctor/appointments/approved/'+this.username]);
  }

  pendingAppointments()
  {
    this.router.navigate(['/doctor/appointments/requested/'+this.username]);
  }

  getPatients()
  {
    this.router.navigate(['/doctor/patientsAssigned/'+this.username]);
  }
  getPendingAppointments()
  {
    const payload = {
      username : this.username
    }
    console.log(payload);
    this.api.post('/getPendingAppointments', payload).subscribe(data=>{
      this.appointments = Observable.interval(10).map(i => data);
    });
  }

 
}
