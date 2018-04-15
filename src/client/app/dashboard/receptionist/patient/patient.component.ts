import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { Patient } from '../../../shared/patient.model';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';  
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private dataService : AdminDataFetcherService) { }
  patients:Patient[];

  ngOnInit() {
      
    this.patients = this.dataService.getPatients();
    //console.log("patients " + this.patients);
  }

}
