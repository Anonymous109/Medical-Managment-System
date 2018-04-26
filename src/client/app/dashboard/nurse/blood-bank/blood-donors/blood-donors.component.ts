import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../shared/api.service';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-blood-donors',
  templateUrl: './blood-donors.component.html',
  styleUrls: ['./blood-donors.component.css']
})
export class BloodDonorsComponent implements OnInit {

  bloodDonors: Observable<Array<any>>;
  
  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getBloodDonors();
  }

  getBloodDonors(){
    this.api.get('/bloodDonors').subscribe(data => {
      this.bloodDonors = Observable.interval(10).map(i => data);
    });
  }

  
}
