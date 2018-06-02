import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';


import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-add-death-report',
  templateUrl: './add-death-report.component.html',
  styleUrls: ['./add-death-report.component.css']
})
export class AddDeathReportComponent implements OnInit {


  patientID: String;
  deadTime: String;
  causeOfDeath: String;
  doctorUserName: String;

  constructor(private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private flashMessagesService: FlashMessagesService,
    private auth: AuthService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    this.api.post('lock', tokenFetched).subscribe(data=> {
      this.doctorUserName = data.user;
    });

  }


  addDeathReport() {

    const payload = {
      patientID: this.patientID,
      deadTime: this.deadTime,
      causeOfDeath: this.causeOfDeath,
      doctorUserName: this.doctorUserName
    }



    this.api.post('/addDeathReport', payload).subscribe(data => {
        if(data.error)
        {
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
          return false;
        }
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
    });

  }
}
