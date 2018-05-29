import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable, ComponentRef, ApplicationRef, NgZone,
ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  nurses: Observable<Array<any>>;
  
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private api: ApiService) {
    this.toastr.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors()
  {
      this.api.get('/nurses').subscribe(data=>{
        this.nurses = Observable.interval(10).map(i => data);
      })
  }

  fire(nurseInfo)
  {
    const payload = {
      firstname : nurseInfo.firstname,
      lastname : nurseInfo.lastname,
      phone : nurseInfo.phone
    }

    
    this.api.post('/fireNurse', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
        
      }
    })

  }

}
