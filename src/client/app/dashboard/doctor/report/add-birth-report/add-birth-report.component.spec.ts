import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBirthReportComponent } from './add-birth-report.component';

describe('AddBirthReportComponent', () => {
  let component: AddBirthReportComponent;
  let fixture: ComponentFixture<AddBirthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBirthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBirthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
