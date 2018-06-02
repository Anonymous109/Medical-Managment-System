import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-blood-donors',
  templateUrl: './blood-donors.component.html',
  styleUrls: ['./blood-donors.component.css']
})
export class BloodDonorsComponent implements OnInit {

  bloodDonors: Observable<Array<any>>;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getBloodDonors();
  }

  getBloodDonors() {
   
    this.api.get('/bloodDonors').subscribe(data=>{
      this.bloodDonors = Observable.interval(10).map(i => data);
    });
  }

}
