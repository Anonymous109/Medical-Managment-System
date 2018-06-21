import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';


import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-add-operation-report',
  templateUrl: './add-operation-report.component.html',
  styleUrls: ['./add-operation-report.component.css']
})
export class AddOperationReportComponent implements OnInit {

  patientId : String;
  reasonOfOperation : Date;
  operationTime : String;
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

  
  addOperationReport() {

    const payload = {
      patientId: this.patientId,
      operationTime : this.operationTime,
      reasonOfOperation : this.reasonOfOperation,
      doctorUserName: this.doctorUserName
    }



    this.api.post('/addOperationReport', payload).subscribe(data => {
        if(data.error)
        {
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
          return false;
        }
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
    });

  }
}
