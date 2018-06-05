import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';
import { AuthService } from '../../../shared/auth.service';
import { ApiService } from '../../../shared/api.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-sidebarnavigation-admin',
  templateUrl: './sidebarnavigation.component.html',
  styleUrls: ['./sidebarnavigation.component.css']
})
export class SidebarnavigationComponent implements OnInit {

  username: any;
  private currentRoute : string[];
  public currentRouting:string;
  constructor(private router:Router, public adminDataFetch: AdminDataFetcherService, private auth: AuthService, private api: ApiService) { 
    this.router.events.subscribe((URL:any)=> {
        this.currentRoute = router.url.split('/');
        console.log(this.currentRoute[this.currentRoute.length - 1]);
        this.currentRouting = this.currentRoute[this.currentRoute.length - 1];
        // console.log('index ' + current);
        // this.currentRoute = URL;
        // console.log('current route ' + this.currentRoute);
      });
  }

  // getDoctors(){
  //   return this.adminDataFetch.getDoctors();
  // }
  ngOnInit() {
    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.username = data.user; 
    });

    this.getDoctors();
    this.getNurses();
    this.getDepartments();
    this.getPatientsList();
    this.getPaymentHistory();
    this.getDeathReports();
    this.getBloodDonors();
    this.getBedAllotment();
    this.getBirthReports();
  }

  doctors: Observable<Array<any>>;
  patients: Observable<Array<any>>;
  nurses: Observable<Array<any>>;
  departments: Observable<Array<any>>;
  payments: Observable<Array<any>>;
  deathReports: Observable<Array<any>>;
  bloodDonors : Observable<Array<any>>;
  birthReports : Observable<Array<any>>;
  bedAllotments : Observable<Array<any>>

  getDoctors()
  {
      this.api.get('/doctors').subscribe(data=>{
        this.doctors = Observable.interval(10).map(i => data);
      })
  }
  getPatientsList()
  {
    
    this.api.get('/patients').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.patients = Observable.interval(10).map(i => data);
    });
  }

  getNurses()
  {
      this.api.get('/nurses').subscribe(data=>{
        this.nurses = Observable.interval(10).map(i => data);
      })
  }

  getDepartments()
  {
    this.api.get('/departments').subscribe(data=>{
      this.departments = Observable.interval(10).map(i => data);
    })
  }

  getPaymentHistory() {
   
    this.api.get('/paymentHistory').subscribe(data => {
      //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
      this.payments = Observable.interval(10).map(i => data);
    });
  }
  getDeathReports(){

    this.api.get('/deathReports').subscribe(data=>{
      this.deathReports = Observable.interval(10).map(i => data);
    });
  }

  getBloodDonors() {
   
    this.api.get('/bloodDonors').subscribe(data=>{
      this.bloodDonors = Observable.interval(10).map(i => data);
    });
  }

  getBirthReports() {

    this.api.get('/birthReports').subscribe(data => {
      this.birthReports = Observable.interval(10).map(i => data);
    });
  }

  getBedAllotment() {
   
    this.api.get('/getReservedBeds').subscribe(data=>{
      this.bedAllotments = Observable.interval(10).map(i => data);
    });
  }
}
