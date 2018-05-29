import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { AuthService} from '../../../shared/auth.service';
import { ApiService} from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  prescriptions: Observable<Array<any>>;
  
  constructor(private api: ApiService, private auth: AuthService,private route: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
) {
  this.toastr.setRootViewContainerRef(vcr);
 }

 ngOnInit() {
    this.getOrderedPresciptions();
  }

  getOrderedPresciptions()
  {
    const payload = {
      username : this.route.snapshot.paramMap.get('doctorUsername')
    }
    this.api.post('/getPresciptionList',payload).subscribe(data => {
      console.log(data);
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.prescriptions = Observable.interval(10).map(i => data);
    });
  }  
}
