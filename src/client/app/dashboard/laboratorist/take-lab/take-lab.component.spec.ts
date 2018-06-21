import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeLabComponent } from './take-lab.component';

describe('TakeLabComponent', () => {
  let component: TakeLabComponent;
  let fixture: ComponentFixture<TakeLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
