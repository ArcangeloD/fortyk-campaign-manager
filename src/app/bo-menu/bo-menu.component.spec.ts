import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoMenuComponent } from './bo-menu.component';

describe('BoMenuComponent', () => {
  let component: BoMenuComponent;
  let fixture: ComponentFixture<BoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
