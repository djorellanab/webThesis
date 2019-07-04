import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementReportComponent } from './report.component';

describe('FunctionalMovementReportComponent', () => {
  let component: FunctionalMovementReportComponent;
  let fixture: ComponentFixture<FunctionalMovementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
