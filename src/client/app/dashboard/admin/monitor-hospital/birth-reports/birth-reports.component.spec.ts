import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthReportsComponent } from './birth-reports.component';

describe('BirthReportsComponent', () => {
  let component: BirthReportsComponent;
  let fixture: ComponentFixture<BirthReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BirthReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
