import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmitHistoryComponent } from './admit-history.component';

describe('AdmitHistoryComponent', () => {
  let component: AdmitHistoryComponent;
  let fixture: ComponentFixture<AdmitHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmitHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
