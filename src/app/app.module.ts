import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { HomeModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    CommonModule,
    NavbarModule,
    HomeModule,
    FooterModule
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
