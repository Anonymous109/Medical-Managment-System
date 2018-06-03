import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeVitalSignComponent } from './take-vital-sign.component';

describe('TakeVitalSignComponent', () => {
  let component: TakeVitalSignComponent;
  let fixture: ComponentFixture<TakeVitalSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeVitalSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeVitalSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
