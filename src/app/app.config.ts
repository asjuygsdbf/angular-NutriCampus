import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {JwtApiService} from "../api/jwt-api/jwt-api.service";
import {ErrorInterceptorApiService} from "../api/error-interceptor-api/error-interceptor-api.service";

// @ts-ignore
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    {provide:HTTP_INTERCEPTORS,useClass:JwtApiService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorApiService, multi:true}
  ]
};
