import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndEditUserComponent } from './add-and-edit-user.component';

describe('AddAndEditUserComponent', () => {
  let component: AddAndEditUserComponent;
  let fixture: ComponentFixture<AddAndEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAndEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
