import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereIsComponent } from './where-is.component';

describe('WhereIsComponent', () => {
  let component: WhereIsComponent;
  let fixture: ComponentFixture<WhereIsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhereIsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhereIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
