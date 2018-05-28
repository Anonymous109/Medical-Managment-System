import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSideBarNavigationComponent } from './doctor-side-bar-navigation.component';

describe('DoctorSideBarNavigationComponent', () => {
  let component: DoctorSideBarNavigationComponent;
  let fixture: ComponentFixture<DoctorSideBarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorSideBarNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSideBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
