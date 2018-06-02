import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/api.service';
import { AuthService } from '../../../../shared/auth.service';
import { Observable } from 'rxjs';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-death-reports',
  templateUrl: './death-reports.component.html',
  styleUrls: ['./death-reports.component.css']
})
export class DeathReportsComponent implements OnInit {

  patientID: any;
  patientsBigData  = "patientsBigData";
  deathReports: Observable<Array<any>>;

  patientFirstName : String;
  patientLastName : String;
  patientGender : String;
  patientAge : String;


  constructor(private api: ApiService) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit() {
    this.getDeathReports();
  }

  getDeathReports(){

    this.api.get('/deathReports').subscribe(data=>{
      this.deathReports = Observable.interval(10).map(i => data);
    });
  }

  refresh()
  {

  }


  download(deathReportsDisplay:any)
  {
    this.patientID = deathReportsDisplay.patientID;
    this.getUserDetail();


    var dd = {
         
      content: [
                   {image : 'data:image/png;base64,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', style: 'imageMine', margin : [0 , 30 , 0 , 20]},
                   {text : 'Death Certificate', style: 'header'},
                   {text : deathReportsDisplay.deadTime , style: 'anotherstyle'},
                   {text : "This is to certify that the records in my office show that",style: 'anotherstyle'},
                   {text : "Mr. / Ms. " + this.patientFirstName + " " + this.patientLastName,style: 'anotherstyle'},
                   {text : "Died on " + deathReportsDisplay.deadTime,style: 'anotherstyle'} ,
                   {text : "Gender : " + this.patientGender,style: 'anotherstyle'},
                   {text : "Age : " + this.patientAge,style: 'anotherstyle'},
                   {text : "Cause of Death : " + deathReportsDisplay.causeOfDeath,style: 'anotherstyle'},
                   {text : "We  are issuing this certificate on the specific  request of " +  this.patientFirstName + " " + this.patientLastName  + " ",style: 'anotherstyle'},
                   {text : " without accepting any liability on behalf of this certificate",style: 'anotherstyle'}
                  ],
      style : {
        imageMine : {
          alignment : 'center'
        },
        header : {
          fontSize: 32,
          bold : true,
          alignment: 'center'
        },
        anotherStyle : {
          fontSize : 18,
          italic : true,
          alignment : 'right',
          bold : true
        }
      }
         
        };
    pdfMake.createPdf(dd).download();
    console.log(deathReportsDisplay.patientID);
  }

  getUserDetail()
  { 
    const payload = {
      id : this.patientID
      
    }
    
    this.api.post('/patientUserDetail', payload).subscribe(data=>{

          console.log(data);


          this.patientFirstName = data.firstname;
          this.patientLastName = data.lastname;
          this.patientAge = data.age;
          this.patientGender = data.gender;
    });

  }
}
