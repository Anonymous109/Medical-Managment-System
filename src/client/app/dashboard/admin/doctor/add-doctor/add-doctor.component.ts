import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable, ComponentRef, ApplicationRef, NgZone,
ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';

import { ApiService } from '../../../../shared/api.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  firstname: String;
  lastname : String;
  // email : String;
  password : String;
  designation : String;
  department : String;
  gender : String;
  phone : String;
  address : String;
  username : String;


  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private api: ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
  
 }
 

  ngOnInit() {
  }

  addDoctor()
  {
    const payload = {
      firstname : this.firstname,
      lastname : this.lastname,
      // email : this.email,
      password : this.password,
      designation : this.designation,
      department : this.department,
      gender: this.gender,
      phone : this.phone,
      address: this.address,
      username: this.username
    }

    this.api.post('/addDoctor', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }
    });
  } 
}
