import {Component, OnInit, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CrearUsuario, Usuario} from "../../../api/user-api/interfaces";
import {NgIf} from "@angular/common";
import {UserDataService} from "../../../api/user-data/user-data.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent{

  // Variable para errores
  formError = ""

  // Inyeccion del Form Builder para validaciones
  formBuilder = inject(FormBuilder)

  // Inyeccion del Router para navegabilidad
  router = inject(Router)

  registerForm = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]]
  })

  get user() {
    return this.registerForm.get('user');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get pass() {
    return this.registerForm.get('password');
  }

  // Inyeccion del UserApiService
  userDataService = inject(UserDataService)

  usuario: CrearUsuario = {
    nombreUsuario: '',
    nombreCompleto: '',
    correo: '',
    contra: '',
    foto: '',
    edad: 0,
    peso: 0,
    talla: 0,
    genero: '',
    nivelActividad: '',
    historialSalud: '',
    meta: '',
    preferenciasDieteticas: '',
    alimentos: '',
  }

  saveData(){
    if(this.registerForm.valid){
      this.userDataService.updateUsuario(this.usuario);
      this.router.navigate(['/paso1']);
    }else{
      this.registerForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }

}
