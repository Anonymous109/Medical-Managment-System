import { Component, OnInit } from '@angular/core';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service'; 
import { Patient } from '../../../shared/patient.model';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/interval";

@Component({
  selector: 'app-labratorist-side-bar-navigation',
  templateUrl: './labratorist-side-bar-navigation.component.html',
  styleUrls: ['./labratorist-side-bar-navigation.component.css']
})
export class LabratoristSideBarNavigationComponent implements OnInit {

  public username:string;
  public patients:Observable<Array<any>>;
  patientsCounter:Observable<Number>;

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

    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.username = data.user; 
    });
  }

}
