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
// import { AddReceptionistComponent as AdminDashAddReceptionistComponent } from './dashboard/admin/receptionist/add-receptionist/add-receptionist.component';
import { AddReceptionistComponent } from './dashboard/admin/receptionist/add-receptionist/add-receptionist.component';
import { ReceptionististDetailComponent as AdminDashReceptionistDetailComponent } from './dashboard/admin/receptionist/receptionistist-detail/receptionistist-detail.component';
import { LaboratoristComponent as AdminDashLabratoristComponent } from './dashboard/admin/laboratorist/laboratorist.component';
import { AddLaboratoristComponent as AdminDashAddLaboratoristComponent } from './dashboard/admin/laboratorist/add-laboratorist/add-laboratorist.component';
import { LaboratoristDetailComponent as AdminDashLaboratoristDetail } from './dashboard/admin/laboratorist/laboratorist-detail/laboratorist-detail.component';
import { PharmacistComponent as AdminDashPharmacistComponent } from './dashboard/admin/pharmacist/pharmacist.component';
import { AddPharmacistComponent as AdminDashAddPharmacistComponent } from './dashboard/admin/pharmacist/add-pharmacist/add-pharmacist.component';
import { PharmacististDetailComponent as AdminDashPharmacistDetailComponent } from './dashboard/admin/pharmacist/pharmacistist-detail/pharmacistist-detail.component';
import { NoticeboardComponent } from './dashboard/admin/noticeboard/noticeboard.component';
import { ProfileComponent as AdminDashProfileComponent } from './dashboard/admin/profile/profile.component';

import { PaymentHistoryComponent } from './dashboard/admin/monitor-hospital/payment-history/payment-history.component';
import { BedAllotmentsComponent as AdminDashBedAllotmentsComponent} from './dashboard/admin/monitor-hospital/bed-allotments/bed-allotments.component';
import { BloodDonorsComponent as AdminDashBloodDonorsComponent} from './dashboard/admin/monitor-hospital/blood-donors/blood-donors.component';
import { BirthReportsComponent as AdminDashBirthReportsComponent} from './dashboard/admin/monitor-hospital/birth-reports/birth-reports.component';
import { DeathReportsComponent as AdminDashDeathReportsComponent } from './dashboard/admin/monitor-hospital/death-reports/death-reports.component';


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
import { TakeVitalSignComponent } from './dashboard/nurse/take-vital-sign/take-vital-sign.component';


/* -------------- Nurse Ends Here --------------------------------*/


// Doctor UI 

import { AppointmentComponent as DoctorDashAppointmentComponent } from './dashboard/doctor/appointment/appointment.component';
import { ApprovedAppointmentsComponent } from './dashboard/doctor/appointment/approved-appointments/approved-appointments.component';
import { BedComponent as DoctorDashBedComponent } from './dashboard/doctor/bed/bed.component';
import { AddBedAllotmentComponent as DoctorDashAddBedAllotment} from './dashboard/doctor/bed/add-bed-allotment/add-bed-allotment.component';
import { BloodBankComponent as DoctorDashBloodBankComponent } from './dashboard/doctor/blood-bank/blood-bank.component';
import { DashboardComponent as DoctorDashComponent } from './dashboard/doctor/dashboard/dashboard.component';
import { MessageComponent as DoctorDashMessageComponent } from './dashboard/doctor/message/message.component';
import { PatientComponent as DoctorDashPatientComponent } from './dashboard/doctor/patient/patient.component';
import { PrescriptionComponent as DoctorDashPrescriptionComponent } from './dashboard/doctor/prescription/prescription.component';
import { AddPrescriptionComponent as DoctorDashAddPrescriptionComponent } from './dashboard/doctor/prescription/add-prescription/add-prescription.component';
import { ProfileComponent as DoctorDashProfileComponent } from './dashboard/doctor/profile/profile.component';


import { OperationReportsComponent } from './dashboard/doctor/report/operation-reports/operation-reports.component';
import { AddOperationReportComponent as DoctorDashAddOperationReportComponent } from './dashboard/doctor/report/add-operation-report/add-operation-report.component';
import { AddDeathReportComponent  as DoctorDashAddDeathReportComponent} from './dashboard/doctor/report/add-death-report/add-death-report.component';
import { AddBirthReportComponent as DoctorDashAddBirthReportComponent} from './dashboard/doctor/report/add-birth-report/add-birth-report.component';
import { BirthReportsComponent as DoctorDashBirthReportComponent} from './dashboard/doctor/report/birth-reports/birth-reports.component';
import { DeathReportsComponent as DoctorDashDeathReportComponent} from './dashboard/doctor/report/death-reports/death-reports.component';
import { ReportComponent as DoctorDashReportComponent } from './dashboard/doctor/report/report.component';

import { PatientDetailComponent as DoctorDashPatientDetailComponent} from './dashboard/doctor/patient/patient-detail/patient-detail.component';

//Laboratorist
import { PatientsComponent as LaboratoristDashPatientComponent } from './dashboard/laboratorist/patients/patients.component';
import { TakeLabComponent } from './dashboard/laboratorist/take-lab/take-lab.component';



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
    component: AdminDashDepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'departments',
    component: AdminDashDepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "departments/add",
    component: AdminDashAddDepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctors",
    component: AdminDashDoctorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctors/add",
    component: AdminDashAddDoctorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctors/:doctorName",
    component: AdminDashDoctorDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patients",
    component: AdminDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "patients/:patientName",
    component: AdminDashPatientDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "nurses",
    component: AdminDashNurseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurses/add",
    component: AdminDashAddNurseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurses/:nurseName",
    component: AdminDashNurseDetailComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: "receptionists",
  //   component: AdminDashReceptionistComponent
  // },
  // {
  //   path: "receptionists/:receptionistName",
  //   component: AdminDashReceptionistDetailComponent
  // },
  // {
  //   path: "receptionists/add",
  //   component: AddReceptionistComponent
  // },
  {
    path: "laboratorists",
    component: AdminDashLabratoristComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "laboratorists/add",
    component: AdminDashAddLaboratoristComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "laboratorists/:laboratoristsName",
    component: AdminDashLaboratoristDetail,
    canActivate: [AuthGuard]
  },
  {
    path : "pharmacists",
    component: AdminDashPharmacistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "pharmacists/add",
    component: AdminDashAddPharmacistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "pharmacists/:pharmacistName",
    component: AdminDashPharmacistDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "payments",
    component: PaymentHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bedAllotments",
    component: AdminDashBedAllotmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "bloodDonors",
    component: AdminDashBloodDonorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "birthReports",
    component: AdminDashBirthReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "deathReports",
    component : AdminDashDeathReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/dash",
    component: ReceptionistDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/patients",
    component: ReceptionistDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/patients/add",
    component: ReceptionistDashAddPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/patientsRecord/:patientId",
    component: ReceptionistPatientRecordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/appointments",
    component: ReceptionistDashAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/appointments/add",
    component: ReceptionistDashAddAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "nurse/dash",
    component: NurseDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/patients",
    component: NurseDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/beds",
    component: NurseDashBedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/beds/add",
    component: NurseDashAddBedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/beds/allotment",
    component: NurseDashBedAllotmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/beds/allotment/add",
    component: NurseDashAddAllotmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/bloodBank",
    component: NurseDashBloodBankComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/bloodBank/addDonor",
    component: NurseDashAddBloodDonorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/bloodBank/bloodDonors",
    component: NurseDashBloodDonorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/profile",
    component: NurseDashProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/report",
    component: NurseDashReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/profile",
    component: NurseDashProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "nurse/takeVitalSign/:patientId",
    component: TakeVitalSignComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/dash",
    component: DoctorDashBedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/appointments/approved/:doctorUsername",
    component: ApprovedAppointmentsComponent,
    canActivate: [AuthGuard]
  },{
    path: "doctor/appointments/requested/:doctorUsername",
    component: DoctorDashAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "doctor/beds/allotment",
    component: DoctorDashBedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/patientsAssigned/:doctorUsername",
    component: DoctorDashPatientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/beds/allotment/add",
    component: DoctorDashAddBedAllotment,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/prescriptions/orderBy/:doctorUsername",
    component: DoctorDashPrescriptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/prescriptions/add/:doctorUsername/:patientFullName",
    component : DoctorDashAddPrescriptionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/operationReports/add",
    component: DoctorDashAddOperationReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path : "doctor/operationReports",
    component : OperationReportsComponent,
    canActivate : [AuthGuard]
  },
  {
    path: "doctor/deathReports",
    component: DoctorDashDeathReportComponent,
    canActivate: [AuthGuard]
  },
  { 
    path : "doctor/deathReports/add",
    component: DoctorDashAddDeathReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/birthReports",
    component: DoctorDashBirthReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/birthReports/add",
    component: DoctorDashAddBirthReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "doctor/patientDetail/:patientId",
    component: DoctorDashPatientDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "labratorist/dash",
    component:LaboratoristDashPatientComponent 
  },
  {
    path : "labratorist/patients",
    component:LaboratoristDashPatientComponent,
    canActivate: [AuthGuard] 
  },
  {
    path : "labratorist/takeLab/:patientId",
    component : TakeLabComponent
  },
  {
    path: "message/inbox",
    component: MessageInboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "message/inbox/:username/:messageId",
    component: MessageDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "message/compose/:username",
    component: MessageComposeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/profile/:username",
    component: AdminDashProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "receptionist/profile/:username",
    component: ReceptionistDashProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nurse/profile/:username",
    component: NurseDashProfileComponent,
    canActivate: [AuthGuard]
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
