import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { AuthService} from '../../../shared/auth.service';
import { ApiService} from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Observable<Array<any>>;
  
  constructor(private api: ApiService, private auth: AuthService,private route: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
) {
  this.toastr.setRootViewContainerRef(vcr);
 }
  ngOnInit() {
    this.getAdmittedPatientsList();
  }

  getAdmittedPatientsList()
  {
    const payload = {
      username : this.route.snapshot.paramMap.get('doctorUsername'),
      status : "unadmitted"
    }
    this.api.post('/assignedPatientsList',payload).subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(10).map(i => data);
    });
  }

  admitPatient(fName , sName)
  {
    const payload = {
      patientFirstName : fName,
      patientLastName : sName
    }
    console.log(payload);
    this.api.post('/admitPatient', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }
      this.getAdmittedPatientsList();
    })
  }

}
