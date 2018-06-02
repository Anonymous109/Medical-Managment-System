import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';
import { FlashMessagesService } from 'ngx-flash-messages';


@Component({
  selector: 'app-add-birth-report',
  templateUrl: './add-birth-report.component.html',
  styleUrls: ['./add-birth-report.component.css']
})
export class AddBirthReportComponent implements OnInit {

  childName : String;
  gender : String;
  birthDate : String;
  birthTime : String;
  weightOfChild : String;
  length : String;
  widthBetweenShoulders : String;
  motherFullName : String;
  fatherFullName : String;
  attendingDoctor : String;


  constructor(private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private flashMessagesService: FlashMessagesService,
    private auth: AuthService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  addBirthReport()
  {

      if(!this.childName || !this.gender || !this.birthDate || !this.birthTime || !this.weightOfChild || !this.length){
        this.toastr.error("Please fill all fields", 'Error !', { toastLife: 3000 });
        return false;
      }

      if(!this.widthBetweenShoulders || !this.motherFullName || !this.fatherFullName || !this.attendingDoctor){
        this.toastr.error("Please fill all fields", 'Error !', { toastLife: 3000 });
        return false;
      }


      const payload = {
        childName : this.childName,
        gender : this.gender,
        birthDate : this.birthDate,
        birthTime : this.birthTime,
        weightOfChild : this.weightOfChild,
        length : this.length,
        widthBetweenShoulders : this.weightOfChild,
        motherFullName : this.motherFullName,
        fatherFullName : this.fatherFullName,
        attendingDoctor : this.attendingDoctor
      }

      this.api.post('/addBirthReport',payload).subscribe(data=>{
        if(data.error)
        {
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
          return false;
        }
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      })
  }
}
