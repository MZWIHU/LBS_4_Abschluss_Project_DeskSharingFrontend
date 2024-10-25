import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableUserComponent } from './admin-table-user.component';

describe('AdminTableUserComponent', () => {
  let component: AdminTableUserComponent;
  let fixture: ComponentFixture<AdminTableUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
