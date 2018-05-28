import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/api.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css']
})
export class BloodBankComponent implements OnInit {

  bloodBank: Observable<Array<any>>;
  
  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.updateBloodStore();
  }

  updateBloodStore()
  {
    this.api.get('/bloodList').subscribe(data => {
      this.bloodBank = Observable.interval(10).map(i => data);
    });
  }

  useBloodInLitre(quantity, bloodType){
    console.log("--- " + quantity + " --- " + bloodType);
    const payload = {
      bloodType : bloodType,
      quantity : quantity
    }
    this.api.post('/useBlood', payload).subscribe(data=>{
        if(data.error){
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
        }else{
          this.toastr.success(data.status, 'Message !', { toastLife: 3000 });
        }

    })
  }
}
