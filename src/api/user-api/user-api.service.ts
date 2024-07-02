import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, lastValueFrom, map, Observable, of, tap, throwError} from "rxjs";
import {AutenticacionUsuario, CrearUsuario, ObtenerUsuarioToken, TokenResponse, Usuario} from "./interfaces";
import {environment} from "../../environments/environment.development";

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
    return lastValueFrom(this.httpClient.get<Usuario[]>(environment.urlMicroservicioUsuario+'/usuario/listar/'))
  }

  registrarUsuario(usuario: CrearUsuario):Observable<any>{
    return this.httpClient.post<Usuario>(environment.urlMicroservicioUsuario+'/autenticacion/registrar/', usuario).pipe(
      catchError(this.handleError))
  }

  iniciarSesion(usuario: AutenticacionUsuario):Observable<any>{
    return this.httpClient.post<any>(environment.urlMicroservicioUsuario + '/autenticacion/iniciar-sesion/', usuario).pipe(
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

  obtenerUsuarioViaToken(token: ObtenerUsuarioToken) {
    return lastValueFrom(
      this.httpClient.post<TokenResponse>(environment.urlMicroservicioUsuario+"/autenticacion/obtener-usuario-token/", token)
    );
  }

  buscarPorUsuario(usuario: string){
    return lastValueFrom(this.httpClient.get<Usuario>(environment.urlMicroservicioUsuario+"/usuario/buscar-por-usuario/" + usuario));
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
