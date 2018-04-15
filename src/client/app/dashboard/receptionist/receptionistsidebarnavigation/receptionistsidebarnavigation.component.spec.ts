import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistsidebarnavigationComponent } from './receptionistsidebarnavigation.component';

describe('ReceptionistsidebarnavigationComponent', () => {
  let component: ReceptionistsidebarnavigationComponent;
  let fixture: ComponentFixture<ReceptionistsidebarnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistsidebarnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistsidebarnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
