import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable,Component, OnInit, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  departmentName: String;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private api :ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  
  ngOnInit() {
  }

  addDepartment()
  {
    const payload = {
        departmentName : this.departmentName
    }

    this.api.post('/addDepartment', payload).subscribe(data=>{
      if(data.error){
        this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
      }else{
        this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
      }
    })
  }
}
