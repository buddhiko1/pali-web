import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { TipitakaModule } from './tipitaka/tipitaka.module';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [AppComponent, OverlayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    CommonModule,
    NavbarModule,
    DictionaryModule,
    TipitakaModule,
    FooterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
