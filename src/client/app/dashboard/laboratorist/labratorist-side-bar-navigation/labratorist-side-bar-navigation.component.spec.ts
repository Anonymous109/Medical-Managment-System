import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabratoristSideBarNavigationComponent } from './labratorist-side-bar-navigation.component';

describe('LabratoristSideBarNavigationComponent', () => {
  let component: LabratoristSideBarNavigationComponent;
  let fixture: ComponentFixture<LabratoristSideBarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabratoristSideBarNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabratoristSideBarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
