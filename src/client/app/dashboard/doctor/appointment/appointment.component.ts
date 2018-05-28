import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService} from '../../../shared/auth.service';
import { ApiService} from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  doctorUsername:String;
  pendingAppointments: Observable<Array<any>>;
  
  constructor(private api: ApiService, private auth: AuthService,private route: ActivatedRoute,
      public toastr: ToastsManager,
      vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  ngOnInit() {
    this.getPendingAppointments();
  }

  getPendingAppointments()
  {
    const payload = {
      username : this.route.snapshot.paramMap.get('doctorUsername')
    }
    console.log(payload);
    this.api.post('/getPendingAppointments', payload).subscribe(data=>{
      this.pendingAppointments = Observable.interval(10).map(i => data);
    });
  }

  approveAppointment(pendingAppointmentsDisplay)
  {
    const payload = {
      patientFirstName : pendingAppointmentsDisplay.patientFirstName,
      patientLastName : pendingAppointmentsDisplay.patientLastName,
      action : "approve"
    }
    this.api.post('/approveAppointment', payload).subscribe(data=>{
        this.toastr.success(data.status, 'Message', { toastLife: 3000 });
        this.getPendingAppointments();
    });
  }

  deleteAppointment(pendingAppointmentsDisplay)
  {
    const payload = {
      patientFirstName : pendingAppointmentsDisplay.patientFirstName,
      patientLastName : pendingAppointmentsDisplay.patientLastName,
      action : "delete"
    }
    this.api.post('/approveAppointment', payload).subscribe(data=>{
        this.toastr.success(data.status, 'Message ', { toastLife: 3000 });
        this.getPendingAppointments();
    });
  }
}
