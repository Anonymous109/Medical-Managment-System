import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-bed-allotments',
  templateUrl: './bed-allotments.component.html',
  styleUrls: ['./bed-allotments.component.css']
})
export class BedAllotmentsComponent implements OnInit {

  bedAllotments: Observable<Array<any>>;

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getPaymentHistory();
  }

  getPaymentHistory() {
   
    this.api.get('/getReservedBeds').subscribe(data=>{
      this.bedAllotments = Observable.interval(10).map(i => data);
    });
  }

}
