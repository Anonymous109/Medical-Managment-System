import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Patient } from '../shared/patient.model';
@Injectable()
export class AdminDataFetcherService {

  private doctorsAmount: Number;
  patients:Patient[];

  constructor(private api: ApiService) {
        
        //Fetch patients
        this.api.get('/patientsList').subscribe(data=>{

            this.patients = data;

        });

        
   }

   getDoctors():Number {
    this.api.get('/getDoctors').subscribe(data=> {
        console.log('---' + data);
    })
    return 1;
   }

   getPatients():Patient[] {
      
       return this.patients;
   }

}
