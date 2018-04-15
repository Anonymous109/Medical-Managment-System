import { Component, OnInit } from '@angular/core';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { Patient } from '../../../shared/patient.model';

@Component({
  selector: 'app-receptionistsidebarnavigation',
  templateUrl: './receptionistsidebarnavigation.component.html',
  styleUrls: ['./receptionistsidebarnavigation.component.css']
})
export class ReceptionistsidebarnavigationComponent implements OnInit {

  constructor(private dataService : AdminDataFetcherService) { 
    
  }
  patients:Patient[];
  patientsCounter:Number;
  ngOnInit() {
      this.patients = this.dataService.getPatients();
      this.patientsCounter = this.patients.length;
  }

}
