import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HomeComponent } from './home.component';
import { BookComponent } from '../book/book.component';
import { LoadingComponent } from '../loading/loading.component';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularSvgIconModule,
    BookComponent,
    LoadingComponent,
  ],
})
export class HomeModule {}
