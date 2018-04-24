import { Component, OnInit } from '@angular/core';


import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //startDate = new Date(1990, 0, 1);

  constructor(private api: ApiService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      fullname: values.fullname,
      username: values.username,
      gender: values.gender,
      email: values.email,
      password: values.pass,
      role: "subscriber"
    };
    
    this.api.post("/signup", payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.router.navigate(['/home']);
      });
  }
}
