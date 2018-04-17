import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseSideBarNavigationComponent } from './nurse-side-bar-navigation.component';

describe('NurseSideBarNavigationComponent', () => {
  let component: NurseSideBarNavigationComponent;
  let fixture: ComponentFixture<NurseSideBarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseSideBarNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseSideBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
