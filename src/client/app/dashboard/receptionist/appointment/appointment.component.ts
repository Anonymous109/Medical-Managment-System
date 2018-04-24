import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api.service';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  appointments:Observable<Array<any>>;
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('/appointmentsList').subscribe(data=>{
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.appointments = Observable.interval(5).map(i=>data);
    });
  }

}
