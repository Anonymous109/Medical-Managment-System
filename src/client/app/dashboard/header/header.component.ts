import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userLock:string;

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
 
  constructor(private auth: AuthService, private api: ApiService) { }



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
  }

  logOut(){
    this.auth.logout();
  }

  lock(){
    const tokenFetched = {
      "token" : this.auth.getToken()
    };
    console.log(tokenFetched);
    //console.log(tokenFetched + " Token Fetched" );
    this.api.post('lock', tokenFetched).subscribe(data=> {
        this.userLock = data.user;
        //console.log("this.userLock " + this.userLock);
        this.auth.lock(this.userLock);

    });
  }
}
