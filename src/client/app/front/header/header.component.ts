import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,
              private api: ApiService
            ) { }

  username: string = "Guest";
  isLoggedIn: boolean = false;
  ngOnInit() {

      if(this.auth.isLoggedIn()){

        this.isLoggedIn = true;
        const tokenFetched = {
          "token" : this.auth.getToken()
        };
        
        //console.log(tokenFetched + " Token Fetched" );
        this.api.post('lock', tokenFetched).subscribe(data=> {
            this.username = data.user;
        });
      }

      console.log("username " + this.username);
  }

  logout(){
    this.auth.logout();
  }
}
