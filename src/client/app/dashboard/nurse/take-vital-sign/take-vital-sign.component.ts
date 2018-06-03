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

  patientFirstName : String;
  patientLastName : String;
  vitalSign : String;

  constructor(private route: ActivatedRoute, private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
    
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }
   
  ngOnInit() {
    this.patientFirstName = this.route.snapshot.paramMap.get('firstname');
    this.patientLastName = this.route.snapshot.paramMap.get('lastname');
  }

  takeVitalSign()
  {
    const payload = {
      firstname : this.patientFirstName,
      lastname : this.patientLastName,
      vitalSign : this.vitalSign
    }

    this.api.post('/takeVitalSign', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Message !', { toastLife: 3000 });
      }
      if(data.status){
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }

    })
  }
} 
