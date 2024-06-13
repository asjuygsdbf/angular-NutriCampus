import {inject, Injectable} from '@angular/core';
import {UserApiService} from "../user-api/user-api.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtApiService implements HttpInterceptor{

  userApiService = inject(UserApiService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: String = this.userApiService.userToken;

    if (token !== "") {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
    }

    return next.handle(req);
  }
}
