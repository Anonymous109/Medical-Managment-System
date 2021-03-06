import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };
    console.log('payload '  + payload.username);

    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.router.navigate(['/dash']);
      });
  }

}
