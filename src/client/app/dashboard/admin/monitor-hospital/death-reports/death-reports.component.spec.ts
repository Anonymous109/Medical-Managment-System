import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathReportsComponent } from './death-reports.component';

describe('DeathReportsComponent', () => {
  let component: DeathReportsComponent;
  let fixture: ComponentFixture<DeathReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
