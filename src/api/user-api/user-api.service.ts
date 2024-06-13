import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, lastValueFrom, map, Observable, of, tap, throwError} from "rxjs";
import {AutenticacionUsuario, CrearUsuario, ObtenerUsuario, TokenResponse, Usuario} from "./interfaces";
import {environment} from "../../env/env.prod"

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData : BehaviorSubject<string> = new BehaviorSubject<string>("");

  httpClient = inject(HttpClient);

  constructor() {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("token")||"");
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error '+error.error);
    }else{
      console.error('Backend retorno el código del estado '+error.message);
      console.log(this.userData);
    }return throwError(() => new Error('Error al iniciar sesión. Revise los datos enviados'));
  }

  listarUsuarios(){
    return lastValueFrom(this.httpClient.get<Usuario[]>(environment.urlBack+'/usuario/listar/'))
  }

  registrarUsuario(usuario: CrearUsuario):Observable<any>{
    return this.httpClient.post<Usuario>(environment.urlBack+'/autenticacion/registrar/', usuario).pipe(
      catchError(this.handleError))
  }

  iniciarSesion(usuario: AutenticacionUsuario):Observable<any>{
    return this.httpClient.post<any>(environment.urlBack + '/autenticacion/iniciar-sesion/', usuario).pipe(
      tap((userData) => {
        console.log("User Data : "+userData);
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    )
  }

  cerrarSesion(){
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  obtenerUsuarioViaToken(obtenerUsuario: ObtenerUsuario) {
    return lastValueFrom(
      this.httpClient.post<TokenResponse>("http://localhost:8082/autenticacion/obtener-usuario-token/", obtenerUsuario)
    );
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string{
    return this.currentUserData.value;
  }
}
