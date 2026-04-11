import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { apiURL } from '../../environment.local';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authHeader = authService.getAuthHeader();
  const isApiRequest = req.url.startsWith(apiURL)

  if (authHeader && isApiRequest) {
    req = req.clone({
      setHeaders: {
        Authorization: authHeader,
      },
    });
  }

  return next(req);
};
