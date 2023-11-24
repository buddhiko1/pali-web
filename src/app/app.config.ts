import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { ErrorHandlerService } from './core/error-handler.service';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
};
