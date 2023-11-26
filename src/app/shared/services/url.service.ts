import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  get urlForActiveUser(): string {
    return `${location.origin}/users/activation`; // confiured in the config.json of pali-cms.
  }

  get urlForPasswordReset(): string {
    return `${location.origin}/auth/password-reset`; // confiured in the config.json of pali-cms.
  }

  get urlForRequestPasswordReset(): string {
    return 'auth/reset-request';
  }

  get urlForLogin(): string {
    return 'auth/login';
  }

  get urlForMe(): string {
    return 'users/me';
  }

  get urlForCreateUser(): string {
    return 'users/creation';
  }
}
