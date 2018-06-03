import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../shared/api.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {

  constructor(private api : ApiService,
              private flashMessagesService: FlashMessagesService,
            ) { }

  ngOnInit() {
  }

  addPatient(form: NgForm, form2: NgForm){
      const inputFields = form.value;
      const inputFields2 = form2.value;
      const date = new Date();
      const registrationFee = 100;  //To be paid by the Patient , to be added to Invoice List
      const paymentReason = "Registration Fee";
      //Error Handlings
      if(inputFields.age <= 0 ){
        this.flashMessagesService.show("Age input error, Please Try Again!", {
          classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
          timeout: 3000, // Default is 3000
        });
        return false;
      }

      //For Searching Purpose , we need to generate a random sequence for identifying a specific Patient
      const patientId = "Afra_" + (inputFields.phone).slice(4 , 8) + "_" + date.getFullYear() + "_mednet";
      const payload = {
        patientId : patientId,
        firstname: inputFields.firstname,
        lastname : inputFields.lastname,
        password: inputFields.password,
        phone: inputFields.phone,
        gender: inputFields2,
        age: inputFields.age,
        doctorAssignStatus: "false"
      };
      
      
      this.api.post('/addPatient', payload).subscribe(data => {

          if(data.error){
            
              this.flashMessagesService.show(data.error, {
                classes: ['alert', 'alert-error'], // You can pass as many classes as you need
                timeout: 5000, // Default is 3000
              });
          }

          if(data.warning) {
              
              this.flashMessagesService.show(data.warning, {
                classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
                timeout: 5000, // Default is 3000
              });
          }
          if(data.status){
            
            const paymentPayload = {
              patientId : patientId,
              paymentReason : paymentReason,
              paymentOn: date.toDateString(),
              amount : 100
            }

            this.api.post('/addIntoInvoice',paymentPayload).subscribe(data2=>{
              if(data2.error){
                this.flashMessagesService.show(data2.error, {
                  classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
                  timeout: 4000, // Default is 3000
                });
              }
                return false;
            });
            
            this.flashMessagesService.show(data.status, {
              classes: ['alert', 'alert-success'], // You can pass as many classes as you need
              timeout: 3000, // Default is 3000
            });
          
          }

        
      });
      
    }
}
