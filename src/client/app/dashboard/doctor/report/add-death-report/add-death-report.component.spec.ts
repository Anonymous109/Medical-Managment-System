import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeathReportComponent } from './add-death-report.component';

describe('AddDeathReportComponent', () => {
  let component: AddDeathReportComponent;
  let fixture: ComponentFixture<AddDeathReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeathReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeathReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
