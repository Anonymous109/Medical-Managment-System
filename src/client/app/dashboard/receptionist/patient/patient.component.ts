import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Patient } from '../../../shared/patient.model';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';  
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  
  constructor(private dataService : AdminDataFetcherService,
              private api: ApiService
            ) { }
  patients:Observable<Array<any>>;
  
  
  ngOnInit() {
      
      this.api.get('/patientsList').subscribe(data=>{
        //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
        this.patients = Observable.interval(100).map(i=>data);
      });
    
  }

}
