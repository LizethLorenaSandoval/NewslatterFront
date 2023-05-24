import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdminIndexComponent } from './nav-admin-index.component';

describe('NavAdminIndexComponent', () => {
  let component: NavAdminIndexComponent;
  let fixture: ComponentFixture<NavAdminIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdminIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAdminIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
