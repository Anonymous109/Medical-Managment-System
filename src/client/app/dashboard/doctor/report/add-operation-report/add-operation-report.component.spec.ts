import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationReportComponent } from './add-operation-report.component';

describe('AddOperationReportComponent', () => {
  let component: AddOperationReportComponent;
  let fixture: ComponentFixture<AddOperationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
