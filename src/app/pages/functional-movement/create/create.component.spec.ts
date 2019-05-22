import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementCreateComponent } from './create.component';

describe('FunctionalMovementCreateComponent', () => {
  let component: FunctionalMovementCreateComponent;
  let fixture: ComponentFixture<FunctionalMovementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
