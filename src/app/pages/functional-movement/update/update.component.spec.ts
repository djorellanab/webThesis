import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementUpdateComponent } from './update.component';

describe('FunctionalMovementUpdateComponent', () => {
  let component: FunctionalMovementUpdateComponent;
  let fixture: ComponentFixture<FunctionalMovementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
