import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodDonorsComponent } from './blood-donors.component';

describe('BloodDonorsComponent', () => {
  let component: BloodDonorsComponent;
  let fixture: ComponentFixture<BloodDonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodDonorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
