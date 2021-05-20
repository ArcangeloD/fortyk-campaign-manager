import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetMailSentComponent } from './reset-mail-sent.component';

describe('ResetMailSentComponent', () => {
  let component: ResetMailSentComponent;
  let fixture: ComponentFixture<ResetMailSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetMailSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetMailSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
