import { TestBed } from '@angular/core/testing';

import { AdminRolService } from './admin-rol.service';

describe('AdminRolService', () => {
  let service: AdminRolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
