import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withInMemoryScrolling,
} from '@angular/router';

import { ErrorHandlerService } from './shared/services/error-handler.service';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
  ],
};
