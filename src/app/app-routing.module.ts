import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export enum UrlEnum {
  Home = 'home',
  Reading = 'reading',
  Dictionary = 'dictionary',
  Grammar = 'grammar',
  Tipitaka = 'tipitak',
  Blog = 'blog',
}

export const RedirectTo = UrlEnum.Dictionary;

const routes: Routes = [
  { path: '', redirectTo: RedirectTo, pathMatch: 'full' },
  {
    path: UrlEnum.Home,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { animation: 'home' },
  },
  {
    path: UrlEnum.Dictionary,
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
