import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-birth-reports',
  templateUrl: './birth-reports.component.html',
  styleUrls: ['./birth-reports.component.css']
})
export class BirthReportsComponent implements OnInit {

  birthReports: Observable<Array<any>>;

  constructor(private api: ApiService){
    
  }

  ngOnInit() {
    this.getBirthReports();
  }

  getBirthReports() {

    this.api.get('/birthReports').subscribe(data => {
      this.birthReports = Observable.interval(10).map(i => data);
    });
  }

}
