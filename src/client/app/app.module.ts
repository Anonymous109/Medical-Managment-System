import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './auth.guard';
import { AdminDataFetcherService } from './shared/admin-data-fetcher.service';
import { ChatServiceService } from './shared/chat-service.service';
/* ----------- Dependencies Ends ------------------- */

import { NgFlashMessagesModule } from 'ng-flash-messages';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { CalendarModule } from 'angular-calendar';
/* ----------- Dependencies Ends ------------------- */

/* ----------- Common Components Starts -------------*/

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PagenotfoundComponent } from './error/pagenotfound/pagenotfound.component';

/* ----------- Common Components Ends -------------*/


/* ------------------------- Front Components Starts  ------------------- */

import { HeaderComponent } from './front/header/header.component';
import { FooterComponent } from './front/footer/footer.component';
import { HomeComponent } from './front/home/home.component';
import { BlogComponent } from './front/blog/blog.component';
import { ShopComponent } from './front/shop/shop.component';
import { ContactComponent } from './front/contact/contact.component';
import { TimeTableComponent } from './front/timetable/timetable.component';

/* ------------------------- Front Components Ends  ------------------- */

/* ----------- Dashboard Common Components Starts -------------*/

import { HeaderComponent as DashboardHeaderComponent } from './dashboard/header/header.component';
import { FooterComponent as DashboardFooterComponent } from './dashboard/footer/footer.component'; 

/* ----------- Dashboard Common Components Ends----------------*/

// -------------------------- --------------------------Admin Dash Component Starts ------------------ -------------------------- ---------//

import { DashboardComponent as AdminDashComponent } from './dashboard/admin/dashboard/dashboard.component';
import { DepartmentComponent as AdminDashDepartmentComponent } from './dashboard/admin/department/department.component';
import { AddDepartmentComponent as AdminDashAddDepartmentComponent } from './dashboard/admin/department/add-department/add-department.component';
import { DoctorComponent as AdminDashDoctorComponent } from './dashboard/admin/doctor/doctor.component';
import { AddDoctorComponent as AdminDashAddDoctorComponent } from './dashboard/admin/doctor/add-doctor/add-doctor.component';
import { DoctorDetailComponent as AdminDashDoctorDetailComponent } from './dashboard/admin/doctor/doctor-detail/doctor-detail.component';
import { LaboratoristComponent as AdminDashLabratoristComponent } from './dashboard/admin/laboratorist/laboratorist.component';
import { AddLaboratoristComponent as AdminDashAddLaboratoristComponent } from './dashboard/admin/laboratorist/add-laboratorist/add-laboratorist.component';
import { LaboratoristDetailComponent as AdminDashLaboratoristDetail } from './dashboard/admin/laboratorist/laboratorist-detail/laboratorist-detail.component';
import { NoticeboardComponent as AdminDashNoticeBoardComponent } from './dashboard/admin/noticeboard/noticeboard.component';
import { AddNoticeComponent as AdminDashAddNoticeComponent } from './dashboard/admin/noticeboard/add-notice/add-notice.component';
import { NurseComponent as AdminDashNurseComponent } from './dashboard/admin/nurse/nurse.component';
import { AddNurseComponent as AdminDashAddNurseComponent } from './dashboard/admin/nurse/add-nurse/add-nurse.component';
import { NurseDetailComponent as AdminDashNurseDetailComponent } from './dashboard/admin/nurse/nurse-detail/nurse-detail.component';
import { PatientComponent as AdminDashPatientComponent } from './dashboard/admin/patient/patient.component';
import { PatientDetailComponent as AdminDashPatientDetailComponent } from './dashboard/admin/patient/patient-detail/patient-detail.component';
import { PharmacistComponent as AdminDashPharmacistComponent } from './dashboard/admin/pharmacist/pharmacist.component';
import { AddPharmacistComponent as AdminDashAddPharmacistComponent } from './dashboard/admin/pharmacist/add-pharmacist/add-pharmacist.component';
import { PharmacististDetailComponent as AdminDashPharmacistDetailComponent } from './dashboard/admin/pharmacist/pharmacistist-detail/pharmacistist-detail.component';
import { ProfileComponent as AdminDashProfileComponent } from './dashboard/admin/profile/profile.component';
import { ReceptionistComponent as AdminDashReceptionistComponent } from './dashboard/admin/receptionist/receptionist.component';
import { AddReceptionistComponent as AdminDashAddReceptionistComponent } from './dashboard/admin/receptionist/add-receptionist/add-receptionist.component';
import { ReceptionististDetailComponent as AdminDashReceptionistDetailComponent } from './dashboard/admin/receptionist/receptionistist-detail/receptionistist-detail.component';
import { SidebarnavigationComponent as AdminDashSideBarNavComponent } from './dashboard/admin/sidebarnavigation/sidebarnavigation.component';

import { PaymentHistoryComponent } from './dashboard/admin/monitor-hospital/payment-history/payment-history.component';
import { BedAllotmentsComponent as AdminDashBedAllotmentsComponent} from './dashboard/admin/monitor-hospital/bed-allotments/bed-allotments.component';
import { BloodDonorsComponent as AdminDashBloodDonorsComponent} from './dashboard/admin/monitor-hospital/blood-donors/blood-donors.component';
import { BirthReportsComponent as AdminDashBirthReportsComponent} from './dashboard/admin/monitor-hospital/birth-reports/birth-reports.component';
import { DeathReportsComponent as AdminDashDeathReportsComponent } from './dashboard/admin/monitor-hospital/death-reports/death-reports.component';

// -------------------------- --------------------------Admin Dash  Component Ends ------------------ -------------------------- ---------//

// -------------------------- --------------------------Doctor Dash Component Starts ------------------ -------------------------- ---------//

import { AppointmentComponent as DoctorDashAppointmentComponent } from './dashboard/doctor/appointment/appointment.component';
import { ApprovedAppointmentsComponent } from './dashboard/doctor/appointment/approved-appointments/approved-appointments.component';
import { BedComponent as DoctorDashBedComponent } from './dashboard/doctor/bed/bed.component';
import { BloodBankComponent as DoctorDashBloodBankComponent } from './dashboard/doctor/blood-bank/blood-bank.component';
import { DashboardComponent as DoctorDashComponent } from './dashboard/doctor/dashboard/dashboard.component';
import { MessageComponent as DoctorDashMessageComponent } from './dashboard/doctor/message/message.component';
import { PatientComponent as DoctorDashPatientComponent } from './dashboard/doctor/patient/patient.component';
import { PrescriptionComponent as DoctorDashPrescriptionComponent } from './dashboard/doctor/prescription/prescription.component';
import { AddPrescriptionComponent as DoctorDashAddPrescriptionComponent } from './dashboard/doctor/prescription/add-prescription/add-prescription.component';
import { ProfileComponent as DoctorDashProfileComponent } from './dashboard/doctor/profile/profile.component';
import { DoctorSideBarNavigationComponent } from './dashboard/doctor/doctor-side-bar-navigation/doctor-side-bar-navigation.component';
import { AddBedAllotmentComponent as DoctorDashAddBedAllotment} from './dashboard/doctor/bed/add-bed-allotment/add-bed-allotment.component';

import { AddOperationReportComponent as DoctorDashAddOperationReportComponent } from './dashboard/doctor/report/add-operation-report/add-operation-report.component';
import { AddDeathReportComponent  as DoctorDashAddDeathReportComponent} from './dashboard/doctor/report/add-death-report/add-death-report.component';
import { AddBirthReportComponent as DoctorDashAddBirthReportComponent} from './dashboard/doctor/report/add-birth-report/add-birth-report.component';
import { BirthReportsComponent as DoctorDashBirthReportComponent} from './dashboard/doctor/report/birth-reports/birth-reports.component';
import { DeathReportsComponent as DoctorDashDeathReportComponent} from './dashboard/doctor/report/death-reports/death-reports.component';
import { ReportComponent as DoctorDashReportComponent } from './dashboard/doctor/report/report.component';

import { PatientDetailComponent as DoctorDashPatientDetailComponent} from './dashboard/doctor/patient/patient-detail/patient-detail.component';

// -------------------------- --------------------------Doctor Dash Component Ends ------------------ -------------------------- ---------//

// -------------------------- --------------------------Laboratorist Dash Component Starts ------------------ -------------------------- ---------//

import { BloodBankComponent as LaboratoristDashBloodBankComponent } from './dashboard/laboratorist/blood-bank/blood-bank.component';
import { BloodDonorComponent as LaboratoristDashBloodDonorComponent } from './dashboard/laboratorist/blood-donor/blood-donor.component';
import { DashboardComponent as LaboratoristDashComponent } from './dashboard/laboratorist/dashboard/dashboard.component';
import { ProfileComponent as LaboratoristDashProfileComponent } from './dashboard/laboratorist/profile/profile.component';

// -------------------------- --------------------------Laboratorist Dash Component Ends ------------------ -------------------------- ---------//

// -------------------------- --------------------------Nurse Dash Component Starts ------------------ -------------------------- ---------//

import { BedComponent as NurseDashBedComponent } from './dashboard/nurse/bed/bed.component';
import { BloodBankComponent as NurseDashBloodBankComponent } from './dashboard/nurse/blood-bank/blood-bank.component';
import { DashboardComponent as NurseDashComponent } from './dashboard/nurse/dashboard/dashboard.component';
import { PatientComponent as NurseDashPatientComponent } from './dashboard/nurse/patient/patient.component';
import { ProfileComponent as NurseDashProfileComponent } from './dashboard/nurse/profile/profile.component';
import { ReportComponent as NurseDashReportComponent } from './dashboard/nurse/report/report.component';
import { NurseSideBarNavigationComponent  } from './dashboard/nurse/nurse-side-bar-navigation/nurse-side-bar-navigation.component';
import { AddBedComponent as NurseDashAddBedComponent} from './dashboard/nurse/bed/add-bed/add-bed.component';
import { AllotmentComponent as NurseDashBedAllotmentComponent } from './dashboard/nurse/bed/allotment/allotment.component';
import { AddAllotmentComponent as NurseDashAddAllotmentComponent  } from './dashboard/nurse/bed/add-allotment/add-allotment.component';
import { AddBloodDonorComponent as NurseDashAddBloodDonorComponent } from './dashboard/nurse/blood-bank/add-blood-donor/add-blood-donor.component';
import { BloodDonorsComponent as NurseDashBloodDonorsComponent  } from './dashboard/nurse/blood-bank/blood-donors/blood-donors.component';
import { TakeVitalSignComponent } from './dashboard/nurse/take-vital-sign/take-vital-sign.component';


// -------------------------- --------------------------Nurse Dash Component Ends ------------------ -------------------------- ---------//

// -------------------------- --------------------------Patient Dash Component Starts ------------------ -------------------------- ---------//

import { AdmitHistoryComponent as PatientDashAdmitHistoryComponent } from './dashboard/patient/admit-history/admit-history.component';
import { AppointmentComponent as PatientDashAppointmentComponent } from './dashboard/patient/appointment/appointment.component';
import { BloodBankComponent as PatientDashBloodComponent } from './dashboard/patient/blood-bank/blood-bank.component';
import { DashboardComponent as PatientDashComponent } from './dashboard/patient/dashboard/dashboard.component';
import { DoctorComponent as PatientDashDoctorComponet } from './dashboard/patient/doctor/doctor.component'; 
import { InvoiceComponent as PatientDashInvoiceComponent } from './dashboard/patient/invoice/invoice.component';
import { MessageComponent as PatientDashMessageComponent } from './dashboard/patient/message/message.component';
import { PresciptionComponent as PatientDashPrescriptionComponent} from './dashboard/patient/presciption/presciption.component';
import { ProfileComponent as PatientDashProfileComponent } from './dashboard/patient/profile/profile.component';

// -------------------------- --------------------------Patient Dash Component Ends ------------------ -------------------------- ---------//

// -------------------------- --------------------------Receptionist Dash Component Starts ------------------ -------------------------- ---------//

import { DashboardComponent as ReceptionistDashComponent } from './dashboard/receptionist/dashboard/dashboard.component';
import { AppointmentComponent as ReceptionistDashAppointmentComponent } from './dashboard/receptionist/appointment/appointment.component';
import { AddAppointmentComponent as ReceptionistDashAddAppointmentComponent } from './dashboard/receptionist/appointment/add-appointment/add-appointment.component';
import { PatientComponent as ReceptionistDashPatientComponent } from './dashboard/receptionist/patient/patient.component';
import { AddpatientComponent as ReceptionistDashAddPatientComponent } from './dashboard/receptionist/patient/addpatient/addpatient.component';
import { ProfileComponent as ReceptionistDashProfileComponent } from './dashboard/receptionist/profile/profile.component';
import { ReceptionistsidebarnavigationComponent } from './dashboard/receptionist/receptionistsidebarnavigation/receptionistsidebarnavigation.component';
import { PatientRecordComponent as ReceptionistPatientRecordComponent} from './dashboard/receptionist/patient/patient-record/patient-record.component';

// -------------------------- --------------------------Receptionist Dash Component Ends ------------------ -------------------------- ---------//
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { InboxComponent as MessageInboxComponent} from './dashboard/messages/inbox/inbox.component';
import { ComposeComponent as MessageComposeComponent } from './dashboard/messages/compose/compose.component';
import { DetailComponent } from './dashboard/messages/inbox/detail/detail.component';

import { PatientsComponent as LaboratoristDashPatientComponent } from './dashboard/laboratorist/patients/patients.component';
import { LabratoristSideBarNavigationComponent } from './dashboard/laboratorist/labratorist-side-bar-navigation/labratorist-side-bar-navigation.component';
import { TakeLabComponent } from './dashboard/laboratorist/take-lab/take-lab.component';

import { OperationReportsComponent } from './dashboard/doctor/report/operation-reports/operation-reports.component';
import { AddOperationReportComponent } from './dashboard/doctor/report/add-operation-report/add-operation-report.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddContactComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    TimeTableComponent,
    BlogComponent,
    ShopComponent,
    ContactComponent,
    SignupComponent,
    PagenotfoundComponent,
    AdminDashComponent,
    AdminDashDepartmentComponent,
    AdminDashAddDepartmentComponent,
    AdminDashDoctorComponent,
    AdminDashAddDoctorComponent,
    AdminDashDoctorDetailComponent,
    AdminDashPatientComponent,
    AdminDashPatientDetailComponent,
    AdminDashNurseComponent,
    AdminDashAddNurseComponent,
    AdminDashNurseDetailComponent,
    AdminDashPharmacistComponent,
    AdminDashAddPharmacistComponent,
    AdminDashPharmacistDetailComponent,
    AdminDashLabratoristComponent,
    AdminDashAddLaboratoristComponent,
    AdminDashLaboratoristDetail,
    AdminDashReceptionistComponent,
    AdminDashAddReceptionistComponent,
    AdminDashReceptionistDetailComponent,
    AdminDashNoticeBoardComponent,
    AdminDashAddNoticeComponent,
    AdminDashSideBarNavComponent,
    AdminDashProfileComponent,
    DoctorDashAppointmentComponent,
    DoctorDashBedComponent,
    DoctorDashBloodBankComponent,
    DoctorDashComponent,
    DoctorDashMessageComponent,
    DoctorDashPatientComponent,
    DoctorDashPrescriptionComponent,
    DoctorDashProfileComponent,
    DoctorDashReportComponent,
    LaboratoristDashBloodBankComponent,
    LaboratoristDashBloodDonorComponent,
    LaboratoristDashComponent,
    LaboratoristDashProfileComponent,
    NurseDashBedComponent,
    NurseDashBloodBankComponent,
    NurseDashAddBloodDonorComponent,
    NurseDashBloodDonorsComponent,
    NurseDashComponent,
    NurseDashPatientComponent,
    NurseDashAddBedComponent,
    NurseDashBedAllotmentComponent,
    NurseDashAddAllotmentComponent,
    NurseDashProfileComponent,
    NurseDashReportComponent,
    NurseSideBarNavigationComponent,
    PatientDashAdmitHistoryComponent,
    PatientDashAppointmentComponent,
    PatientDashBloodComponent,
    PatientDashComponent,
    PatientDashDoctorComponet,
    PatientDashInvoiceComponent,
    PatientDashMessageComponent,
    PatientDashPrescriptionComponent,
    PatientDashProfileComponent,
    ReceptionistDashAppointmentComponent,
    ReceptionistDashComponent,
    ReceptionistDashPatientComponent,
    ReceptionistDashProfileComponent,
    LockscreenComponent,
    ReceptionistsidebarnavigationComponent,
    ReceptionistDashAddPatientComponent,
    ReceptionistDashAddAppointmentComponent,
    ReceptionistPatientRecordComponent,
    MessageInboxComponent,
    MessageComposeComponent,
    DetailComponent,
    DoctorSideBarNavigationComponent,
    ApprovedAppointmentsComponent,
    DoctorDashAddBedAllotment,
    DoctorDashAddPrescriptionComponent,
    DoctorDashAddOperationReportComponent,
    DoctorDashAddDeathReportComponent,
    DoctorDashAddBirthReportComponent,
    DoctorDashBirthReportComponent,
    DoctorDashDeathReportComponent,
    DoctorDashReportComponent,
    PaymentHistoryComponent,
    AdminDashBedAllotmentsComponent,
    AdminDashBloodDonorsComponent,
    AdminDashBirthReportsComponent,
    AdminDashDeathReportsComponent,
    TakeVitalSignComponent,
    DoctorDashPatientDetailComponent,
    LaboratoristDashPatientComponent,
    LabratoristSideBarNavigationComponent,
    TakeLabComponent,
    OperationReportsComponent,
    AddOperationReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    NgFlashMessagesModule.forRoot(),
    ChartsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    FlashMessagesModule,
    CalendarModule.forRoot()
  ],
  providers: [ApiService, AuthService, AuthGuard, AdminDataFetcherService,ChatServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
