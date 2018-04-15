import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacististDetailComponent } from './pharmacistist-detail.component';

describe('PharmacististDetailComponent', () => {
  let component: PharmacististDetailComponent;
  let fixture: ComponentFixture<PharmacististDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacististDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacististDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
