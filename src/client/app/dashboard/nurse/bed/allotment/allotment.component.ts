import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css']
})
export class AllotmentComponent implements OnInit {

  
  //Observable for Asyncronous Data Loading
  beds: Observable<Array<any>>;
  
  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllotments();
  }

  getAllotments(){

    this.api.get('/getReservedBeds').subscribe(data=>{
      this.beds = Observable.interval(10).map(i => data);
    });
  }
}
