import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthService,
    private flashMessagesService: FlashMessagesService,
  ) { }
  public username: string;
  ngOnInit() {
    let user = this.route.snapshot.paramMap.get('user');
    console.log('user ' + user);
    this.username = user;
  }

  login(form: NgForm) {

    const values = form.value;

    const payload = {
      username: this.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {

        //Handle request for login {where user is not found or password is incorrect}
        if (data.error) {
          this.flashMessagesService.show(data.error, {
            classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
            timeout: 2000,
          });
        }


        //Needs some fix
        this.auth.setToken(data.token);
        if (data.role == 'admin') {
          this.router.navigate(['/admin/dash']);
        } else if (data.role == 'receptionist') {
          this.router.navigate(['/receptionist/dash']);
        } else if(data.role == 'nurse') {
          this.router.navigate(['/nurse/dash']);
        }

      });

  }
}
