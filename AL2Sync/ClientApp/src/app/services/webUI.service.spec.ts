import { TestBed } from '@angular/core/testing';

import { SessionmanagerService } from './sessionmanager.service';

describe('SessionmanagerService', () => {
  let service: SessionmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
