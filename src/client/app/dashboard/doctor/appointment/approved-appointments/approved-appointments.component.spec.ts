import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedAppointmentsComponent } from './approved-appointments.component';

describe('ApprovedAppointmentsComponent', () => {
  let component: ApprovedAppointmentsComponent;
  let fixture: ComponentFixture<ApprovedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
