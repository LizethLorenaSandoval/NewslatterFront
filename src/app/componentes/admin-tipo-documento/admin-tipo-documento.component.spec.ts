import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTipoDocumentoComponent } from './admin-tipo-documento.component';

describe('AdminTipoDocumentoComponent', () => {
  let component: AdminTipoDocumentoComponent;
  let fixture: ComponentFixture<AdminTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTipoDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
