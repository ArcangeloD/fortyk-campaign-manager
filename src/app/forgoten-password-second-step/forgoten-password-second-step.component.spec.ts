import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotenPasswordSecondStepComponent } from './forgoten-password-second-step.component';

describe('ForgotenPasswordSecondStepComponent', () => {
  let component: ForgotenPasswordSecondStepComponent;
  let fixture: ComponentFixture<ForgotenPasswordSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotenPasswordSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotenPasswordSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
