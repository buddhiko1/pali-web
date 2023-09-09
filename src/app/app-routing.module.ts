import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PlaceholderPageComponent } from './placeholder-page/placeholder-page.component';

export enum UrlEnum {
  Home = 'home',
  Grammar = 'grammar',
  Dictionary = 'dictionary',
  Vocabulary = 'vocabulary',
  Tipitaka = 'tipitaka',
  Reading = 'reading',
  Blog = 'blog',
  Donation = 'donation',
  Account = 'account',
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
    path: UrlEnum.Grammar,
    component: PlaceholderPageComponent,
    data: { animation: UrlEnum.Grammar, text: 'Under development ...' },
  },
  {
    path: UrlEnum.Dictionary,
    loadChildren: () =>
      import('./dictionary/dictionary.module').then((m) => m.DictionaryModule),
    data: { animation: UrlEnum.Dictionary },
  },
  {
    path: UrlEnum.Vocabulary,
    component: PlaceholderPageComponent,
    data: { animation: UrlEnum.Vocabulary, text: 'Under development ...' },
  },
  {
    path: UrlEnum.Tipitaka,
    loadChildren: () =>
      import('./tipitaka/tipitaka.module').then((m) => m.TipitakaModule),
    data: { animation: UrlEnum.Tipitaka },
  },
  {
    path: UrlEnum.Account,
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
    data: { animation: UrlEnum.Account },
  },
  {
    path: UrlEnum.Reading,
    component: PlaceholderPageComponent,
    data: { animation: UrlEnum.Reading, text: 'Under development ...' },
  },
  {
    path: UrlEnum.Blog,
    component: PlaceholderPageComponent,
    data: { animation: UrlEnum.Blog, text: 'Under development ...' },
  },
  {
    path: '**',
    component: PlaceholderPageComponent,
    data: { animation: 'error', text: '404 Page not found' },
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
