import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { updatedDataGuard } from './updated-data.guard';

describe('updatedDataGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => updatedDataGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
