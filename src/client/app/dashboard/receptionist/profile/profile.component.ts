import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs';

import { ReceptionistDetail } from '../../../shared/reception_detail.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public username: string;
  
  userDetail: ReceptionistDetail;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
    ) { }

  ngOnInit() {
    let user = this.route.snapshot.paramMap.get('user');
    this.username = user;
    this.getReceptionistUserDetail();
  }

  getReceptionistUserDetail(){
      const payload = {
          username: this.username,
          role: "receptionist"
      };

      this.api.post('/userDetail', payload).subscribe(data => {
          this.userDetail = data.firstname;
      });
  }
}
