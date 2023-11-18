import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app/app-routing.module';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(AppRoutingModule, CommonModule)],
}).catch((err) => console.error(err));
