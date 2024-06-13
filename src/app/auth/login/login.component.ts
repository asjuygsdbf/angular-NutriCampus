import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AutenticacionUsuario} from "../../../api/user-api/interfaces";
import {UserApiService} from "../../../api/user-api/user-api.service";
import {CommonModule} from "@angular/common";
import {MostrarService} from "../../../api/mostrar/mostrar.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{

  // Error que saldra en caso de haber algun fallo en el login
  loginError = ""
  // Para la validacion de campos en el front
  formBuilder = inject(FormBuilder)
  // Para la navegabilidad
  router = inject(Router)
  // Para mostrar el Header y Footer despues del login
  mostrarService = inject(MostrarService)
  // Validacion de los campos del login form
  loginForm = this.formBuilder.group({
    user: ['', Validators.required],
    pass: ['', Validators.required]
  })

  // Forma rapida de la revision de estas validaciones
  get user(){
    return this.loginForm.controls.user;
  }

  get pass(){
    return this.loginForm.controls.pass;
  }

  //Mapeo del objeto que se mandara al Backend
  autenticacionUsuario: AutenticacionUsuario = {
    nombreUsuario : "",
    contra : ""
  }

  // Inyeccion del servicio que integra Backend con Frontend
  userApiService = inject(UserApiService)

  autenticarUsuario(){
    if(this.loginForm.valid){
      this.loginError="";
      console.log("Llamando al servicio de autenticar sesion "+this.loginForm);
      this.userApiService.iniciarSesion(this.autenticacionUsuario).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          this.loginError="Credenciales invalidas";
        },
        complete: () => {
          console.info("Login completo")
          this.mostrarService.mostrarHeaderAndFooter(true)
          this.router.navigateByUrl('/').then(() => {
            window.location.reload();
          });
          this.loginForm.reset();
        }
      });
    }else{
      this.loginForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }

}
