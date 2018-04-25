import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-add-allotment',
  templateUrl: './add-allotment.component.html',
  styleUrls: ['./add-allotment.component.css']
})
export class AddAllotmentComponent implements OnInit {

  //Form Fields Binding 
  selectedBed: any;
  selectedPatient: any;
  allotmentTime: Date;
  dischargeTime: Date;

  //Observable for Asyncronous Data Loading
  beds: Observable<Array<any>>;
  patients: Observable<Array<any>>;

  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
      this.getBeds();
      this.getPatients();
  }

  addBedAllotment(){
    
    const payload = {
      bedNumber: this.selectedBed.bedNumber,
      allotmentTime: this.allotmentTime,
      dischargeTime: this.dischargeTime,
      bedType: this.selectedBed.bedType,
      bedDescription: this.selectedBed.bedDescription,
      patientFirstName: this.selectedPatient.firstname,
      patientLastName: this.selectedPatient.lastname,
      status: "reserved"
    };

    this.api.post('/reserveBed', payload).subscribe(data => {
        if(data.error){
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
        }
        if(data.message){
          this.toastr.success(data.message, 'Great !', { toastLife: 3000 });
        }
    }); 
  }

  getBeds(){
    this.api.get('/getFreeBeds').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.beds = Observable.interval(10).map(i => data);
    });
  }
  
  getPatients(){
    this.api.get('/patientsList').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(10).map(i => data);
    });
  }
}
