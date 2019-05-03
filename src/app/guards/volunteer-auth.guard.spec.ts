import { TestBed, async, inject } from '@angular/core/testing';

import { VolunteerAuthGuard } from './volunteer-auth.guard';

describe('VolunteerAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolunteerAuthGuard]
    });
  });

  it('should ...', inject([VolunteerAuthGuard], (guard: VolunteerAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
