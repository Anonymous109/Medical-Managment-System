import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Injectable,Component, OnInit, ComponentRef, ApplicationRef, NgZone,
  ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
    console.log("Success");
    
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
  
  ngOnInit() {
  }

}
