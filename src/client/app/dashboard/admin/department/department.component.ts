import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../../../shared/api.service'; 

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  departments: Observable<Array<any>>;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments()
  {
    this.api.get('/departments').subscribe(data=>{
      this.departments = Observable.interval(10).map(i => data);
    })
  }

}
