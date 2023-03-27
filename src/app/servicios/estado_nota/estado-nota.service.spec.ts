import { TestBed } from '@angular/core/testing';

import { EstadoNotaService } from './estado-nota.service';

describe('EstadoNotaService', () => {
  let service: EstadoNotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoNotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
