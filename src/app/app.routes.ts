import { Routes } from '@angular/router';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'grammar',
    component: PlaceholderPageComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'dictionaries',
    loadComponent: () =>
      import('./dictionaries/dictionaries.component').then(
        (m) => m.DictionariesComponent,
      ),
  },
  {
    path: 'vocabulary',
    component: PlaceholderPageComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'tipitaka',
    loadComponent: () =>
      import('./tipitaka/tipitaka.component').then((m) => m.TipitakaComponent),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'reading',
    component: PlaceholderPageComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'blog',
    component: PlaceholderPageComponent,
    data: { text: 'Under development' },
  },
  {
    path: '**',
    component: PlaceholderPageComponent,
    data: { text: '404 Page not found' },
  },
];
