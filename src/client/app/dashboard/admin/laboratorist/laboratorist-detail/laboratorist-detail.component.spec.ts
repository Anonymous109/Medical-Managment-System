import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoristDetailComponent } from './laboratorist-detail.component';

describe('LaboratoristDetailComponent', () => {
  let component: LaboratoristDetailComponent;
  let fixture: ComponentFixture<LaboratoristDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoristDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoristDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
