import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { Observable } from 'rxjs';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-add-blood-donor',
  templateUrl: './add-blood-donor.component.html',
  styleUrls: ['./add-blood-donor.component.css']
})
export class AddBloodDonorComponent implements OnInit {

  bloodGroups:string[] = ["A+", "A-", "B+","B-", "AB","O+", "O-"];
  sex:string[] = ["Male","Female"];
  
  bloodDonorName:string;
  bloodDonorEmail:string;
  bloodDonorAddress:string;
  bloodDonorPhone:string;
  selectedSex:string;
  bloodDonorAge:Number;
  selectedBloodGroup:string;

  constructor(private api:ApiService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }


  ngOnInit() {
  }

  


  addBloodDonor(){

    if(!this.bloodDonorName || !this.bloodDonorEmail || !this.bloodDonorAddress || !this.bloodDonorPhone || !this.selectedSex || !this.selectedBloodGroup){
      this.toastr.error("Please fill all fields", 'Message', { toastLife: 3000 });
      return false;
    }

    if(this.bloodDonorAge <=0)
    {
      this.toastr.error('Blood Donor is not matured enough for Blood Donation !','Message', { toastLife: 3000 });
      return false;
    }

    const payload = {
      bloodDonorName: this.bloodDonorName,
      bloodDonorEmail:this.bloodDonorEmail,
      bloodDonorAddress:this.bloodDonorAddress,
      bloodDonorPhone:this.bloodDonorPhone,
      selectedSex:this.selectedSex,
      bloodDonorAge:this.bloodDonorAge,
      selectedBloodGroup:this.selectedBloodGroup
    };

    this.api.post('/addBloodDonor', payload).subscribe( data=> {
        if(data.err){
          this.toastr.error(data.error, 'Error !', { toastLife: 3000 });
        }
        if(data.message){
          this.toastr.success(data.message, 'Message !', { toastLife: 3000 });
        }
    })
  }
}
