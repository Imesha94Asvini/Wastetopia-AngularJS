import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResourceviewComponent } from './request-resourceview.component';

describe('RequestResourceviewComponent', () => {
  let component: RequestResourceviewComponent;
  let fixture: ComponentFixture<RequestResourceviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResourceviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResourceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
