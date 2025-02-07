import { TestBed } from '@angular/core/testing';

import { RouterAdapterService } from './router-adapter.service';

describe('RouterAdapterService', () => {
  let service: RouterAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
