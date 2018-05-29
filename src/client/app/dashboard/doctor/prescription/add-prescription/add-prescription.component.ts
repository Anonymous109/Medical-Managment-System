import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { AuthService} from '../../../../shared/auth.service';
import { ApiService} from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {

  prescriptionDetail: String;

  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private flashMessagesService: FlashMessagesService,
    private route: ActivatedRoute
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }
  ngOnInit() {
  }

  addPrescription()
  {
      if(this.prescriptionDetail.length <= 5)
      {
        this.flashMessagesService.show('Please , descripte the prescription very well', {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 2000, // Default is 3000
        });
      }else{

        const payload = {
          username : this.route.snapshot.paramMap.get('doctorUsername'),
          patientFullName : this.route.snapshot.paramMap.get('patientFullName'),
          prescriptionDetail : this.prescriptionDetail
        }
        this.api.post('/addPrescription', payload).subscribe(data=>{
          if(data.error){
            this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
          }else{
            this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
          }
        })
      }
  }
}
