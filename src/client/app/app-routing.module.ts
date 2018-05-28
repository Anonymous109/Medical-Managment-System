import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

import { HeaderComponent } from './front/header/header.component';
import { FooterComponent } from './front/footer/footer.component';
import { HomeComponent } from './front/home/home.component';
import { ShopComponent } from './front/shop/shop.component';
import { BlogComponent } from './front/blog/blog.component';
import { ContactComponent } from './front/contact/contact.component';
import { TimeTableComponent } from './front/timetable/timetable.component';
import { SignupComponent } from './signup/signup.component';


import  { HeaderComponent as DashHeaderComponent } from './dashboard/header/header.component';

import { PagenotfoundComponent } from './error/pagenotfound/pagenotfound.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

//Admin UI Components
import { DashboardComponent as AdminDashComponent } from './dashboard/admin/dashboard/dashboard.component';
import { DepartmentComponent as AdminDashDepartmentComponent } from './dashboard/admin/department/department.component';
import { AddDepartmentComponent as AdminDashAddDepartmentComponent } from './dashboard/admin/department/add-department/add-department.component';
import { DoctorComponent as AdminDashDoctorComponent } from './dashboard/admin/doctor/doctor.component';
import { AddDoctorComponent as AdminDashAddDoctorComponent } from './dashboard/admin/doctor/add-doctor/add-doctor.component';
import { DoctorDetailComponent as AdminDashDoctorDetailComponent } from './dashboard/admin/doctor/doctor-detail/doctor-detail.component';
import { PatientComponent as AdminDashPatientComponent } from './dashboard/admin/patient/patient.component';
import { PatientDetailComponent as AdminDashPatientDetailComponent } from './dashboard/admin/patient/patient-detail/patient-detail.component';
import { NurseComponent as AdminDashNurseComponent } from './dashboard/admin/nurse/nurse.component';
import { AddNurseComponent as AdminDashAddNurseComponent } from './dashboard/admin/nurse/add-nurse/add-nurse.component';
import { NurseDetailComponent as AdminDashNurseDetailComponent } from './dashboard/admin/nurse/nurse-detail/nurse-detail.component';
import { ReceptionistComponent as AdminDashReceptionistComponent } from './dashboard/admin/receptionist/receptionist.component';
import { AddReceptionistComponent as AdminDashAddReceptionistComponent } from './dashboard/admin/receptionist/add-receptionist/add-receptionist.component';
import { ReceptionististDetailComponent as AdminDashReceptionistDetailComponent } from './dashboard/admin/receptionist/receptionistist-detail/receptionistist-detail.component';
import { LaboratoristComponent as AdminDashLabratoristComponent } from './dashboard/admin/laboratorist/laboratorist.component';
import { AddLaboratoristComponent as AdminDashAddLaboratoristComponent } from './dashboard/admin/laboratorist/add-laboratorist/add-laboratorist.component';
import { LaboratoristDetailComponent as AdminDashLaboratoristDetail } from './dashboard/admin/laboratorist/laboratorist-detail/laboratorist-detail.component';
import { PharmacistComponent as AdminDashPharmacistComponent } from './dashboard/admin/pharmacist/pharmacist.component';
import { AddPharmacistComponent as AdminDashAddPharmacistComponent } from './dashboard/admin/pharmacist/add-pharmacist/add-pharmacist.component';
import { PharmacististDetailComponent as AdminDashPharmacistDetailComponent } from './dashboard/admin/pharmacist/pharmacistist-detail/pharmacistist-detail.component';
import { NoticeboardComponent } from './dashboard/admin/noticeboard/noticeboard.component';
import { ProfileComponent as AdminDashProfileComponent } from './dashboard/admin/profile/profile.component';
// Admin UI Ends

//Receptionist UI
import { DashboardComponent as ReceptionistDashComponent } from './dashboard/receptionist/dashboard/dashboard.component';
import { AddpatientComponent as ReceptionistDashAddPatientComponent } from './dashboard/receptionist/patient/addpatient/addpatient.component';
import { PatientComponent as ReceptionistDashPatientComponent } from './dashboard/receptionist/patient/patient.component';
import { AppointmentComponent as ReceptionistDashAppointmentComponent } from './dashboard/receptionist/appointment/appointment.component';
import { AddAppointmentComponent as ReceptionistDashAddAppointmentComponent } from './dashboard/receptionist/appointment/add-appointment/add-appointment.component';
import { ProfileComponent  as ReceptionistDashProfileComponent } from './dashboard/receptionist/profile/profile.component';
import { PatientRecordComponent as ReceptionistPatientRecordComponent} from './dashboard/receptionist/patient/patient-record/patient-record.component';


// Nurse UI
import { BedComponent as NurseDashBedComponent } from './dashboard/nurse/bed/bed.component';
import { BloodBankComponent as NurseDashBloodBankComponent } from './dashboard/nurse/blood-bank/blood-bank.component';
import { DashboardComponent as NurseDashComponent } from './dashboard/nurse/dashboard/dashboard.component';
import { PatientComponent as NurseDashPatientComponent } from './dashboard/nurse/patient/patient.component';
import { ProfileComponent as NurseDashProfileComponent } from './dashboard/nurse/profile/profile.component';
import { ReportComponent as NurseDashReportComponent } from './dashboard/nurse/report/report.component';
import { AddBedComponent as NurseDashAddBedComponent} from './dashboard/nurse/bed/add-bed/add-bed.component';
import { AllotmentComponent as NurseDashBedAllotmentComponent } from './dashboard/nurse/bed/allotment/allotment.component';
import { AddAllotmentComponent as NurseDashAddAllotmentComponent  } from './dashboard/nurse/bed/add-allotment/add-allotment.component';
import { AddBloodDonorComponent as NurseDashAddBloodDonorComponent } from './dashboard/nurse/blood-bank/add-blood-donor/add-blood-donor.component';
import { BloodDonorsComponent as NurseDashBloodDonorsComponent  } from './dashboard/nurse/blood-bank/blood-donors/blood-donors.component';


/* -------------- Nurse Ends Here --------------------------------*/


// Doctor UI 

import { AppointmentComponent as DoctorDashAppointmentComponent } from './dashboard/doctor/appointment/appointment.component';
import { BedComponent as DoctorDashBedComponent } from './dashboard/doctor/bed/bed.component';
import { BloodBankComponent as DoctorDashBloodBankComponent } from './dashboard/doctor/blood-bank/blood-bank.component';
import { DashboardComponent as DoctorDashComponent } from './dashboard/doctor/dashboard/dashboard.component';
import { MessageComponent as DoctorDashMessageComponent } from './dashboard/doctor/message/message.component';
import { PatientComponent as DoctorDashPatientComponent } from './dashboard/doctor/patient/patient.component';
import { PrescriptionComponent as DoctorDashPrescriptionComponent } from './dashboard/doctor/prescription/prescription.component';
import { ProfileComponent as DoctorDashProfileComponent } from './dashboard/doctor/profile/profile.component';
import { ReportComponent as DoctorDashReportComponent } from './dashboard/doctor/report/report.component';



// Message UI
import { InboxComponent as MessageInboxComponent} from './dashboard/messages/inbox/inbox.component';
import { ComposeComponent as MessageComposeComponent } from './dashboard/messages/compose/compose.component';
import { DetailComponent  as MessageDetailComponent} from './dashboard/messages/inbox/detail/detail.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'calender',
    component: NoticeboardComponent
  },
  {
    path: 'home',
    component: HomeComponent
    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'signup',
    component: SignupComponent
  },
  {
    path: 'timetable',
    component: TimeTableComponent
  },
  {
    path : 'shop',
    component: ShopComponent
  },
  {
    path : 'blog',
    component: BlogComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path : 'admin/dash',
    component: AdminDashComponent
  },
  {
    path: 'departments',
    component: AdminDashDepartmentComponent
  },
  {
    path: "departments/add",
    component: AdminDashAddDepartmentComponent
  },
  {
    path: "doctors",
    component: AdminDashDoctorComponent
  },
  {
    path: "doctors/add",
    component: AdminDashAddDoctorComponent
  },
  {
    path: "doctors/:doctorName",
    component: AdminDashDoctorDetailComponent
  },
  {
    path: "patients",
    component: AdminDashPatientComponent
  },
  {
    path: "patients/:patientName",
    component: AdminDashPatientDetailComponent
  },
  {
    path : "nurses",
    component: AdminDashNurseComponent
  },
  {
    path: "nurses/add",
    component: AdminDashAddNurseComponent
  },
  {
    path: "nurses/:nurseName",
    component: AdminDashNurseDetailComponent
  },
  {
    path: "receptionists",
    component: AdminDashReceptionistComponent
  },
  {
    path: "receptionists/:receptionistName",
    component: AdminDashReceptionistDetailComponent
  },
  {
    path: "receptionists/add",
    component: AdminDashAddReceptionistComponent
  },
  {
    path: "laboratorists",
    component: AdminDashLabratoristComponent
  },
  {
    path: "laboratorists/add",
    component: AdminDashAddLaboratoristComponent
  },
  {
    path: "laboratorists/:laboratoristsName",
    component: AdminDashLaboratoristDetail
  },
  {
    path : "pharmacists",
    component: AdminDashPharmacistComponent
  },
  {
    path: "pharmacists/add",
    component: AdminDashAddPharmacistComponent
  },
  {
    path: "pharmacists/:pharmacistName",
    component: AdminDashPharmacistDetailComponent
  },
  {
    path: "receptionist/dash",
    component: ReceptionistDashComponent
  },
  {
    path: "receptionist/patients",
    component: ReceptionistDashPatientComponent
  },
  {
    path: "receptionist/patients/add",
    component: ReceptionistDashAddPatientComponent
  },
  {
    path: "receptionist/patientsRecord/:patientId",
    component: ReceptionistPatientRecordComponent
  },
  {
    path: "receptionist/appointments",
    component: ReceptionistDashAppointmentComponent
  },
  {
    path: "receptionist/appointments/add",
    component: ReceptionistDashAddAppointmentComponent
  },
  {
    path : "nurse/dash",
    component: NurseDashComponent
  },
  {
    path: "nurse/patients",
    component: NurseDashPatientComponent
  },
  {
    path: "nurse/beds",
    component: NurseDashBedComponent
  },
  {
    path: "nurse/beds/add",
    component: NurseDashAddBedComponent
  },
  {
    path: "nurse/beds/allotment",
    component: NurseDashBedAllotmentComponent
  },
  {
    path: "nurse/beds/allotment/add",
    component: NurseDashAddAllotmentComponent
  },
  {
    path: "nurse/bloodBank",
    component: NurseDashBloodBankComponent
  },
  {
    path: "nurse/bloodBank/addDonor",
    component: NurseDashAddBloodDonorComponent
  },
  {
    path: "nurse/bloodBank/bloodDonors",
    component: NurseDashBloodDonorsComponent
  },
  {
    path: "nurse/profile",
    component: NurseDashProfileComponent
  },
  {
    path: "nurse/report",
    component: NurseDashReportComponent
  },
  {
    path: "nurse/profile",
    component: NurseDashProfileComponent
  },
  {
    path: "doctor/dash",
    component: DoctorDashComponent
  },
  {
    path: "message/inbox",
    component: MessageInboxComponent
  },
  {
    path: "message/inbox/:username/:messageId",
    component: MessageDetailComponent
  },
  {
    path: "message/compose/:username",
    component: MessageComposeComponent
  },
  {
    path: "admin/profile/:username",
    component: AdminDashProfileComponent
  },
  {
    path: "receptionist/profile/:username",
    component: ReceptionistDashProfileComponent
  },
  {
    path: "nurse/profile/:username",
    component: NurseDashProfileComponent
  }, 
  {
    path: 'lock/:user',
    component: LockscreenComponent
  },
  {
    path : '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
