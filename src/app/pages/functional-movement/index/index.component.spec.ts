import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementIndexComponent } from './index.component';

describe('FunctionalMovementIndexComponent', () => {
  let component: FunctionalMovementIndexComponent;
  let fixture: ComponentFixture<FunctionalMovementIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
