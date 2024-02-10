import { Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', title: 'Home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'grammar',
    component: PlaceholderComponent,
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
    component: PlaceholderComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./books/books.component').then((m) => m.BooksComponent),
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
    component: PlaceholderComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'blogs',
    loadChildren: () =>
      import('./blogs/blogs.routes').then((m) => m.BLOGS_ROUTES),
  },
  {
    path: '**',
    component: PlaceholderComponent,
    data: { text: '404 Page not found' },
  },
];
