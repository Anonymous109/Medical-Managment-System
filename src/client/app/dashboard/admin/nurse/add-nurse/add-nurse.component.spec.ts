import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNurseComponent } from './add-nurse.component';

describe('AddNurseComponent', () => {
  let component: AddNurseComponent;
  let fixture: ComponentFixture<AddNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
