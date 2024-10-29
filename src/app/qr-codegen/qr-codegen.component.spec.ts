import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodegenComponent } from './qr-codegen.component';

describe('QrCodegenComponent', () => {
  let component: QrCodegenComponent;
  let fixture: ComponentFixture<QrCodegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodegenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
