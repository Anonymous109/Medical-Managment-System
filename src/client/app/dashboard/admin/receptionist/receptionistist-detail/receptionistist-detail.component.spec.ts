import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionististDetailComponent } from './receptionistist-detail.component';

describe('ReceptionististDetailComponent', () => {
  let component: ReceptionististDetailComponent;
  let fixture: ComponentFixture<ReceptionististDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionististDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionististDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
