import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  public username:string;
  ngOnInit() {
    let user = this.route.snapshot.paramMap.get('user');
    console.log('user ' + user);
    this.username = user;
  }

}
