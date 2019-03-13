import { TestBed } from '@angular/core/testing';

import { PosixService } from './posix.service';

describe('PosixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosixService = TestBed.get(PosixService);
    expect(service).toBeTruthy();
  });
});
