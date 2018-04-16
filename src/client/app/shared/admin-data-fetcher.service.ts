import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Patient } from '../shared/patient.model';
import { Observable } from 'rxjs';
@Injectable()
export class AdminDataFetcherService {

  private doctorsAmount: Number;
  patients:Observable<Array<any>>;

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

   currentUser:string;
   getCurrentUser():string {
       this.api.get('/lock').subscribe(data=>{
            this.currentUser = data.user;
       });
       return this.currentUser;
   }
}
