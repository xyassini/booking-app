import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule),
  }
];
