import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedsuccessComponent } from './addedsuccess.component';

describe('AddedsuccessComponent', () => {
  let component: AddedsuccessComponent;
  let fixture: ComponentFixture<AddedsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
