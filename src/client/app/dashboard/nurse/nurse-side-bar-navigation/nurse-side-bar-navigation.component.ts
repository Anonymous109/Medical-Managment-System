import { Component, OnInit } from '@angular/core';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service'; 
import { Patient } from '../../../shared/patient.model';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/interval";
@Component({
  selector: 'app-nurse-side-bar-navigation',
  templateUrl: './nurse-side-bar-navigation.component.html',
  styleUrls: ['./nurse-side-bar-navigation.component.css']
})
export class NurseSideBarNavigationComponent implements OnInit {
  
  public username:string;
  public patients:Observable<Array<any>>;
  public beds:Observable<Array<any>>;
  patientsCounter:Observable<Number>;
  bloodBank: Observable<Array<any>>;
  
  constructor(
    private dataService : AdminDataFetcherService,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    
    this.api.get('/patientsList').subscribe(data=>{
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(100).map(i=>data);
    });

    this.api.get('/beds').subscribe(data => {
      this.beds = Observable.interval(10).map(i => data);
    });

    this.api.get('/bloodList').subscribe(data => {
      this.bloodBank = Observable.interval(10).map(i => data);
      //this.organizeBloodTypes();
    });

    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.username = data.user; 
    });
  }

}
