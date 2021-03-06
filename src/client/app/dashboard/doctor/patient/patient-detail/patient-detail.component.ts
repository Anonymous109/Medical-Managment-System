import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patientId : String;
  firstName : String;
  lastName: String;
  vitalSign: String;
  phone: String;
  gender: String;
  age: String;
  bloodPressureSystolic : Number;
  bloodPressureDiastolic : Number;
  hemoglobin : String;
  operationReportHistory: String = "";


  
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.getPatientInfo();
    this.getOperationReports();
}


  getPatientInfo()
  {
      const payload = {
        patientId : this.patientId
      }

      this.api.post('/patientUserDetail', payload).subscribe(data=>{
          if(data.error){
            console.log(data.error);
          }else{
            this.firstName = data.firstname;
            this.lastName = data.lastname;
            this.phone = data.phone;
            this.age = data.age;
            this.gender = data.gender;
            this.vitalSign = data.vitalSign;
            this.bloodPressureSystolic = data.bloodPressureSystolic;
            this.bloodPressureDiastolic = data.bloodPressureDiastolic;
            this.hemoglobin = data.hemoglobin;
          }
      });
  }

  getOperationReports() {

    const payload = {
      patientId : this.patientId
    }
    this.api.post('/getUserOperationHistory', payload).subscribe(data=>{
        this.operationReportHistory = data.record;
    });
  }
}
