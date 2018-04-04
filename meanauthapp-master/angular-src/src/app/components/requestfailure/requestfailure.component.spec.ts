import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestfailureComponent } from './requestfailure.component';

describe('RequestfailureComponent', () => {
  let component: RequestfailureComponent;
  let fixture: ComponentFixture<RequestfailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestfailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
