import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpHeaders, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    console.log('coming to interceptor & token is -----------'+sessionStorage.getItem('token'));
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      req = req.clone({
         setHeaders: {
            Authorization: sessionStorage.getItem('token')
         }
        })
      }
    else {
      setHeaders: {
        'Access-Control-Allow-Origin'     
       }
    }
      
    return next.handle(req);

  }

}
