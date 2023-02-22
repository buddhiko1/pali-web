import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dictionary', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { animation: 'home' },
  },
  {
    path: 'dictionary',
    loadChildren: () =>
      import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
    data: { animation: 'dictionary' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { animation: 'error' },
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
