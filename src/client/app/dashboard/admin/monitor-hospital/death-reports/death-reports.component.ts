import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-death-reports',
  templateUrl: './death-reports.component.html',
  styleUrls: ['./death-reports.component.css']
})
export class DeathReportsComponent implements OnInit {

  constructor(private api: ApiService) { }
  deathReports: Observable<Array<any>>;
  ngOnInit() {
    this.getDeathReports();
  }

  getDeathReports(){

    this.api.get('/deathReports').subscribe(data=>{
      this.deathReports = Observable.interval(10).map(i => data);
    });
  }
}
