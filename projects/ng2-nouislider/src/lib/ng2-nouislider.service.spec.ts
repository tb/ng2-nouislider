import { TestBed } from '@angular/core/testing';

import { Ng2NouisliderService } from './ng2-nouislider.service';

describe('Ng2NouisliderService', () => {
  let service: Ng2NouisliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ng2NouisliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
