import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmOrdersComponent } from './adm-orders.component';

describe('AdmOrdersComponent', () => {
  let component: AdmOrdersComponent;
  let fixture: ComponentFixture<AdmOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
