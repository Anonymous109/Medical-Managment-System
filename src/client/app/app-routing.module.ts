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
// Admin UI Ends

//Receptionist UI
import { DashboardComponent as ReceptionistDashComponent } from './dashboard/receptionist/dashboard/dashboard.component';
import { AddpatientComponent as ReceptionistDashAddPatientComponent } from './dashboard/receptionist/patient/addpatient/addpatient.component';
import { PatientComponent as ReceptionistDashPatientComponent } from './dashboard/receptionist/patient/patient.component';
import { AppointmentComponent as ReceptionistDashAppointmentComponent } from './dashboard/receptionist/appointment/appointment.component';
import { AddAppointmentComponent as ReceptionistDashAddAppointmentComponent } from './dashboard/receptionist/appointment/add-appointment/add-appointment.component';

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
    path: "receptionist/appointments",
    component: ReceptionistDashAppointmentComponent
  },
  {
    path: "receptionist/appointments/add",
    component: ReceptionistDashAddAppointmentComponent
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
