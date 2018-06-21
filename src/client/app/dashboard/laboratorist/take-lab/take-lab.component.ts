import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-take-lab',
  templateUrl: './take-lab.component.html',
  styleUrls: ['./take-lab.component.css']
})
export class TakeLabComponent implements OnInit {

  patientId : String;
  labResult : String;
  
  constructor(private route: ActivatedRoute, private api: ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
    
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

   ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId');
  }

  takeLab()
  {
    const payload = {
      patientId : this.patientId,
      labResult : this.labResult
    }

    this.api.post('/takeLab', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Message !', { toastLife: 3000 });
      }
      if(data.status){
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }

    })
  }

}
