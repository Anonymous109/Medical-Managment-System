import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  fullname:String;
  phone : String;
  email : String;
  date : String;
  date2 : String;


  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private api :ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  addAppointment()
  {

    const payload = {
      fullname : this.fullname,
      phone : this.phone,
      email : this.email,
      date : this.date
    }

      this.api.post('/addGuestAppointment', payload).subscribe(data=>{
        if(data.error){
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
        }else{
          this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
        }
      });
  }
}
