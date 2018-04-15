import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataFetcherService } from '../../../shared/admin-data-fetcher.service';

@Component({
  selector: 'app-sidebarnavigation-admin',
  templateUrl: './sidebarnavigation.component.html',
  styleUrls: ['./sidebarnavigation.component.css']
})
export class SidebarnavigationComponent implements OnInit {

  private currentRoute : string[];
  public currentRouting:string;
  constructor(private router:Router, public adminDataFetch: AdminDataFetcherService) { 
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
  }

}
