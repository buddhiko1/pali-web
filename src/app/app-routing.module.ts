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
    loadChildren: () =>
      import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
  },
  {
    path: 'vocabulary',
    component: PlaceholderPageComponent,
    data: { text: 'Under development' },
  },
  {
    path: 'tipitaka',
    loadChildren: () =>
      import('./tipitaka/tipitaka.module').then((m) => m.TipitakaModule),
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
      // useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
