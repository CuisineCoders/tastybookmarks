import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);

    return from(authService.getAccessTokenFromLocalStorage()).pipe(
        switchMap(token => {
            if (token) {
                const clonedReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${token}` },
                });
                return next(clonedReq);
            }
            return next(req);
        })
    );
};
