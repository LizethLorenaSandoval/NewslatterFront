import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperartokenComponent } from './recuperartoken.component';

describe('RecuperartokenComponent', () => {
  let component: RecuperartokenComponent;
  let fixture: ComponentFixture<RecuperartokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperartokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperartokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
