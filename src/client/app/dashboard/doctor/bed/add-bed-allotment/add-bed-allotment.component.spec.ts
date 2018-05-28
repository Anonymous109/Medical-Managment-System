import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBedAllotmentComponent } from './add-bed-allotment.component';

describe('AddBedAllotmentComponent', () => {
  let component: AddBedAllotmentComponent;
  let fixture: ComponentFixture<AddBedAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBedAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBedAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
