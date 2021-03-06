import { Component, OnInit } from '@angular/core';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { ApiService } from '../../../shared/api.service';
import { AuthService } from '../../../shared/auth.service'; 
import { Patient } from '../../../shared/patient.model';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/interval";

@Component({
  selector: 'app-receptionistsidebarnavigation',
  templateUrl: './receptionistsidebarnavigation.component.html',
  styleUrls: ['./receptionistsidebarnavigation.component.css']
})
export class ReceptionistsidebarnavigationComponent implements OnInit {

  public patients:Observable<Array<any>>;
  public appointments: Observable<Array<any>>;
  
  patientsCounter:Observable<Number>;
  public username:string;

  constructor(private dataService : AdminDataFetcherService,
              private api: ApiService,
              private auth: AuthService
            ) { 
    
  }
  
  
  ngOnInit() {

    this.api.get('/patientsList').subscribe(data=>{
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(100).map(i=>data);
    });
    
    //this.username = this.dataService.getCurrentUser();
    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.username = data.user; 
    });

    this.api.get('/appointmentsList').subscribe(data=>{
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.appointments = Observable.interval(5).map(i=>data);
    });
  }

}
