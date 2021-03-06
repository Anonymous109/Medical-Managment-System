import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgFlashMessageService } from 'ng-flash-messages';
import { FlashMessagesService } from 'ngx-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import {
  Injectable, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRole: string;
  userName: string;
  customRoutingURL: string;

  constructor(private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private ngFlashMessageService: NgFlashMessageService,
    private flashMessagesService: FlashMessagesService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {

      const payload = {
        tempToken: this.auth.getToken()
      };
      this.api.post('lock', payload)
        .subscribe(data => {

          this.userRole = data.role;
          this.userName = data.username;
          console.log("user role is " + this.userRole);
          console.log("user name " + this.userName);
          this.customRoutingURL = "/" + this.userRole + "/dash";
          this.router.navigate([this.customRoutingURL]);
        });

    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };


    this.api.post('authenticate', payload)
      .subscribe(data => {

        //Handle request for login {where user is not found or password is incorrect}
        if (data.error) {
          this.flashMessagesService.show(data.error, {
            classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
            timeout: 3000, // Default is 3000
          });
        }

        console.log(data.role + "    role");
        this.auth.setToken(data.token);
        if (data.role == 'admin') {
          this.router.navigate(['/admin/dash']);
        } else if (data.role == 'receptionist') {
          this.router.navigate(['/receptionist/dash']);
        } else if (data.role == 'nurse') {
          this.router.navigate(['/nurse/dash']);
        }else if(data.role == 'doctor'){

          this.checkDisabledStatus(values.username, "doctor");
          
        }else if(data.role == 'labratorist')
        {
          this.router.navigate(['/labratorist/dash']);
        }else if(data.role == 'subscriber'){
          this.router.navigate(['/home']);
        }

      });
  }

    checkDisabledStatus(username:String, role:String)
    {
      const payload = {
        username: username,
        role: role
      }

      this.api.post('/getdisabledStatus', payload).subscribe(data=>{

        if(data.status == true){
          this.toastr.error("Sorry , You are not allowed to enter for the moment", 'Error !', { toastLife: 4000 });
          console.log("U r not allowed to enter");
          return false;
        }
        this.router.navigate(['/doctor/dash']);
      });
    }

}
