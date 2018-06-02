import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAllotmentsComponent } from './bed-allotments.component';

describe('BedAllotmentsComponent', () => {
  let component: BedAllotmentsComponent;
  let fixture: ComponentFixture<BedAllotmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedAllotmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedAllotmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
