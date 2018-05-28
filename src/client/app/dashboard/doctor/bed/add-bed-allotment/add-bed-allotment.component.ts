import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';


import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-add-bed-allotment',
  templateUrl: './add-bed-allotment.component.html',
  styleUrls: ['./add-bed-allotment.component.css']
})
export class AddBedAllotmentComponent implements OnInit {

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
    vcr: ViewContainerRef,
    private flashMessagesService: FlashMessagesService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
      this.getBeds();
      this.getPatients();
  }

  parseDate(input)
  {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[0],parts[1]-1, parts[2])
  }

  addBedAllotment(){
    
    const date = new Date();

    
    const payload = {
      bedNumber: this.selectedBed.bedNumber,
      allotmentTime: date.toLocaleDateString(),
      dischargeTime: this.dischargeTime,
      bedType: this.selectedBed.bedType,
      bedDescription: this.selectedBed.bedDescription,
      patientFirstName: this.selectedPatient.firstname,
      patientLastName: this.selectedPatient.lastname,
      status: "reserved"
    };

    this.api.post('/reserveBed', payload).subscribe(data => {
        if(data.error){
          this.toastr.error(data.error, 'Message !', { toastLife: 3000 });
        }
        if(data.message){
          this.toastr.success(data.message, 'Message !', { toastLife: 3000 });
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
