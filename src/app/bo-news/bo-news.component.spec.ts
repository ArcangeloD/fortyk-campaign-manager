import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoNewsComponent } from './bo-news.component';

describe('BoNewsComponent', () => {
  let component: BoNewsComponent;
  let fixture: ComponentFixture<BoNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
