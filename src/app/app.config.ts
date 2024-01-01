import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withInMemoryScrolling,
} from '@angular/router';

import { ErrorHandlerService } from './shared/services/error-handler.service';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      APP_ROUTES,
      withComponentInputBinding(),
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
