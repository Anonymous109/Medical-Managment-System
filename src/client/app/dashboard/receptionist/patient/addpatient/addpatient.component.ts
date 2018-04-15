import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../../shared/api.service';
import { FlashMessagesService } from 'ngx-flash-messages';

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

  addPatient(form: NgForm, form2: NgForm, form3: NgForm){
      const inputFields = form.value;
      const inputFields2 = form2.value;
      const inputFields3 = form3.value;

      const payload = {
        firstname: inputFields.firstname,
        lastname : inputFields.lastname,
        email: inputFields.email,
        password: inputFields.password,
        phone: inputFields.phone,
        gender: inputFields2,
        age: inputFields.age,
        bloodCategory: inputFields3
      };

      this.api.post('/addPatient', payload).subscribe(data => {

          if(data.error){
            
              this.flashMessagesService.show(data.error, {
                classes: ['alert', 'alert-error'], // You can pass as many classes as you need
                timeout: 3000, // Default is 3000
              });
          }

          if(data.warning) {
              
              this.flashMessagesService.show(data.warning, {
                classes: ['alert', 'alert-danger'], // You can pass as many classes as you need
                timeout: 3000, // Default is 3000
              });
          }
          if(data.status){
              
            this.flashMessagesService.show(data.status, {
              classes: ['alert', 'alert-success'], // You can pass as many classes as you need
              timeout: 3000, // Default is 3000
            });
          }
          
      });
    
    }
}
