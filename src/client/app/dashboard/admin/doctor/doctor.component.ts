import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable, ComponentRef, ApplicationRef, NgZone,
ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Observable<Array<any>>;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private api: ApiService) {
    this.toastr.setRootViewContainerRef(vcr)
  }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors()
  {
      this.api.get('/doctors').subscribe(data=>{
        this.doctors = Observable.interval(10).map(i => data);
      })
  }



  fire(doctorInfo)
  {
    const payload = {
      firstname : doctorInfo.firstname,
      lastname : doctorInfo.lastname,
      phone : doctorInfo.phone
    }

    
    this.api.post('/fireDoctor', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
        
      }
    })

  }

  enable(doctorInfo)
  {
    const payload = {
      firstname : doctorInfo.firstname,
      lastname : doctorInfo.lastname,
      phone : doctorInfo.phone
    }

    
    this.api.post('/enableDoctor', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
        
      }
    })

  }

}
