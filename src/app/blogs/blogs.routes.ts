import { Routes } from '@angular/router';
import { isLoggedGuardFn } from '../shared/services/guard.fn';

export const BLOGS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./blogs.component').then((m) => m.BlogsComponent),
  },
  {
    path: 'editor',
    canActivate: [isLoggedGuardFn],
    loadComponent: () =>
      import('./blog-editor/blog-editor.component').then(
        (m) => m.BlogEditorComponent,
      ),
  },
  {
    path: 'viewer/:id',
    loadComponent: () =>
      import('./blog-viewer/blog-viewer.component').then(
        (m) => m.BlogViewerComponent,
      ),
  },
];
