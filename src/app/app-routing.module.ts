import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export enum UrlEnum {
  Home = 'home',
  Grammar = 'grammar',
  Dictionary = 'dictionary',
  Vocabulary = 'vocabulary',
  Tipitaka = 'tipitaka',
  Reading = 'reading',
  Blog = 'blog',
}

export const RedirectTo = UrlEnum.Home;

const routes: Routes = [
  { path: '', redirectTo: RedirectTo, pathMatch: 'full' },
  {
    path: UrlEnum.Home,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { animation: UrlEnum.Home },
  },
  {
    path: UrlEnum.Dictionary,
    loadChildren: () =>
      import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
    data: { animation: UrlEnum.Dictionary },
  },
  {
    path: UrlEnum.Tipitaka,
    loadChildren: () =>
      import('./tipitaka/tipitaka.module').then((m) => m.TipitakaModule),
    data: { animation: UrlEnum.Tipitaka },
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
