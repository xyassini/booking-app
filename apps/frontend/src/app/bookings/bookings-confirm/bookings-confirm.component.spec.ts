import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsConfirmComponent } from './bookings-confirm.component';

describe('BookingsConfirmComponent', () => {
  let component: BookingsConfirmComponent;
  let fixture: ComponentFixture<BookingsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingsConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
