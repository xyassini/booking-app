import "reflect-metadata"
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookingsCreateComponent} from './bookings-create.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ToastrModule} from "ngx-toastr";

describe('BookingsCreateComponent', () => {
  let component: BookingsCreateComponent;
  let fixture: ComponentFixture<BookingsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [BookingsCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with controls', () => {
    expect(component.form.controls.guestCount).toBeTruthy();
    expect(component.form.controls.user.controls.firstName).toBeTruthy();
    expect(component.form.controls.user.controls.lastName).toBeTruthy();
    expect(component.form.controls.user.controls.address).toBeTruthy();
    expect(component.form.controls.user.controls.country).toBeTruthy();
  });

  // An end-to-end test would make more sense here

});
