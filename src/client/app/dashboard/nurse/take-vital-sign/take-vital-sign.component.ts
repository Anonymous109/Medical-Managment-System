import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-take-vital-sign',
  templateUrl: './take-vital-sign.component.html',
  styleUrls: ['./take-vital-sign.component.css']
})
export class TakeVitalSignComponent implements OnInit {

  patientId : String;
  vitalSign : String;
  bloodPressureSystolic : Number;
  bloodPressureDiastolic : Number;
  hemoglobin : Number;
  mass : Number;
  temprature : Number;

  constructor(private route: ActivatedRoute, private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
    
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }
   
  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
  }

  takeVitalSign()
  {

    if(this.temprature < 0 || this.mass < 0)
    { 
      this.toastr.error("Temprature can't be less than Zero, Please try again !", 'Error !', { toastLife: 3000 });
      return false;
    }

    if(this.temprature && this.vitalSign && this.bloodPressureDiastolic && this.bloodPressureSystolic && this.hemoglobin)
    {
      this.toastr.error("Add all required fields, Please try again !", 'Error !', { toastLife: 3000 });
      return false;
    }

    const payload = {
      patientId : this.patientId,
      vitalSign : this.vitalSign,
      bloodPressureSystolic : this.bloodPressureSystolic,
      bloodPressureDiastolic: this.bloodPressureDiastolic,
      hemoglobin: this.hemoglobin,
      mass : this.mass,
      temprature : this.temprature
    }

    this.api.post('/takeVitalSign', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }
      if(data.status){
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }

    })
  }
} 
