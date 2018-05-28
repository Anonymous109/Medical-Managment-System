import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../../shared/auth.service';
import { ApiService} from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-approved-appointments',
  templateUrl: './approved-appointments.component.html',
  styleUrls: ['./approved-appointments.component.css']
})
export class ApprovedAppointmentsComponent implements OnInit {

  doctorUsername:String;
  approvedAppointments: Observable<Array<any>>;
  
  constructor(private api: ApiService, private auth: AuthService,private route: ActivatedRoute) { }

  ngOnInit() {
    
    const payload = {
      username : this.route.snapshot.paramMap.get('doctorUsername')
    }
    console.log(payload);
    this.api.post('/getApprovedAppointments', payload).subscribe(data=>{
      this.approvedAppointments = Observable.interval(10).map(i => data);
    });
  }

}
