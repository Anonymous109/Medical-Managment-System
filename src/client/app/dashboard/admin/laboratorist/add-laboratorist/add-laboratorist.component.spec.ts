import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaboratoristComponent } from './add-laboratorist.component';

describe('AddLaboratoristComponent', () => {
  let component: AddLaboratoristComponent;
  let fixture: ComponentFixture<AddLaboratoristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLaboratoristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLaboratoristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
