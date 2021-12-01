import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.authenticated) {
            const authToken = this.auth.authToken;
            const modifiedReq = req.clone({ 
                headers: req.headers.set("Authorization", `Bearer<${authToken}>`),
            });
            return next.handle(modifiedReq);
        }
        else {
            return next.handle(req);
        }
    }
}