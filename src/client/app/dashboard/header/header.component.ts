import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userLock:string;
  public userRole: string;
  public noticeList:Observable<Array<any>>;
  

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [200, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // lineChart
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
  public pieChartType:string = 'pie';
 
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
 
  constructor(private auth: AuthService, private api: ApiService, private router:Router) { }



  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  items: string[] = [ "archie" , "jake" , "richard" ];
  term:string = "jake";
  
  ngOnInit() {
    
    this.getRecentNotice();

    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    //console.log(tokenFetched + " Token Fetched" );
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.userLock = data.user;
        this.userRole = data.role;
    });
  }

  searchItem(form: NgForm)
  {
    const word = form.value;
    const payload = {
      patientId: word.search_query
    }

    this.api.post('/getFromPatientRecord', payload).subscribe(data=>{
        this.router.navigate(['receptionist/patientsRecord/'+payload.patientId]);
    });

    return;
  }

  getRecentNotice()
  {
    this.api.get('/notice').subscribe(data=>{
        //The interval is set to 1second , just to create some lag to indicate the data is fetched from Database
        this.noticeList = Observable.interval(100).map(i=>data);
      });
  }

  profile(){
    if (this.userRole == 'admin') {
      this.router.navigate(['/admin/profile/'+ this.userLock]);
    } else if (this.userRole == 'receptionist') {
      this.router.navigate(['/receptionist/profile/'+ this.userLock]);
    } else if (this.userRole == 'nurse') {
      this.router.navigate(['/nurse/profile/' + this.userLock]);
    } 
  }

  logOut(){
    this.auth.logout();
  }

  lock(){
    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    
    //console.log(tokenFetched + " Token Fetched" );
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.userLock = data.user;
        //console.log("this.userLock " + this.userLock);
        this.auth.lock(this.userLock);

    });
  }
}
