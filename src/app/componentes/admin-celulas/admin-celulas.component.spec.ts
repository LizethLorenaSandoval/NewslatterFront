import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCelulasComponent } from './admin-celulas.component';

describe('AdminCelulasComponent', () => {
  let component: AdminCelulasComponent;
  let fixture: ComponentFixture<AdminCelulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCelulasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCelulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
