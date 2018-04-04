import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedfailureComponent } from './addedfailure.component';

describe('AddedfailureComponent', () => {
  let component: AddedfailureComponent;
  let fixture: ComponentFixture<AddedfailureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedfailureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedfailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
