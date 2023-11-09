import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';

const routes: Routes = [
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
    path: 'dictionary',
    loadComponent: () =>
      import('./dictionary/dictionary.component').then(
        (m) => m.DictionaryComponent,
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
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
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

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
