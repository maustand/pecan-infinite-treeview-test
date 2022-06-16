import { TestBed } from '@angular/core/testing';

import { BlackListPolicyService } from './blacklist-policy.service';

describe('BlackListPolicyService', () => {
  let service: BlackListPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackListPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
