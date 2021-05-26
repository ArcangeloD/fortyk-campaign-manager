import { TestBed } from '@angular/core/testing';

import { AsRoleGuard } from './as-role.guard';

describe('AsRoleGuard', () => {
  let guard: AsRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AsRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
