import { TestBed, async, inject } from '@angular/core/testing';

import { PersonAuthGuard } from './person-auth.guard';

describe('PersonAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonAuthGuard]
    });
  });

  it('should ...', inject([PersonAuthGuard], (guard: PersonAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
