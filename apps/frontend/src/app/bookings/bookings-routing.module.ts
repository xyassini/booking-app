import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingsComponent} from "./bookings.component";
import {BookingsCreateComponent} from "./bookings-create/bookings-create.component";
import {BookingsConfirmComponent} from "./bookings-confirm/bookings-confirm.component";

const routes: Routes = [
  {
    path: '',
    component: BookingsComponent,
  },
  {
    path: 'create',
    component: BookingsCreateComponent
  },
  {
    path: 'confirm/:id',
    component: BookingsConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule {
}
