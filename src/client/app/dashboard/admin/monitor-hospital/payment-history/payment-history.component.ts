import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

  payments: Observable<Array<any>>;

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
   
    this.api.get('/paymentHistory').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.payments = Observable.interval(10).map(i => data);
    });
  }
}
