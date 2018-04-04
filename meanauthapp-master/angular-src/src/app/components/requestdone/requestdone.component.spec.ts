import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestdoneComponent } from './requestdone.component';

describe('RequestdoneComponent', () => {
  let component: RequestdoneComponent;
  let fixture: ComponentFixture<RequestdoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestdoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestdoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
