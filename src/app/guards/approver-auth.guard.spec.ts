import { TestBed, async, inject } from '@angular/core/testing';

import { ApproverAuthGuard } from './approver-auth.guard';

describe('ApproverAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproverAuthGuard]
    });
  });

  it('should ...', inject([ApproverAuthGuard], (guard: ApproverAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
