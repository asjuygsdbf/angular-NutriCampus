import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CrearUsuario} from "../../api/user-api/interfaces";
import {UserDataService} from "../../api/user-data/user-data.service";
import {UserApiService} from "../../api/user-api/user-api.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RadioValueDirectiveDirective} from "./radio-value-directive.directive";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RadioValueDirectiveDirective,
    NgForOf
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  formError = ""
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

  router = inject(Router)
  formBuilder = inject(FormBuilder)
  userDataService = inject(UserDataService)
  userApiService = inject(UserApiService)

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    imagen: ['', Validators.required],
    peso: [Validators.required],
    talla: [Validators.required],
    edad: [Validators.required],
    historiaSalud: ['', Validators.required],
    alimentos: ['', Validators.required]
  })

  ngOnInit() {
    this.userDataService.currentUsuario.subscribe(data => {
      if (data) {
        this.usuario = data;
        console.log(this.usuario)
      }
    });
  }

  handleImageSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      const imageFile = inputElement.files[0];
      this.convertImageToBase64(imageFile, (base64String) => {
        // Aquí puedes usar la variable 'base64String' como desees
        if (this.usuario) {  // Verifica que 'this.usuario' no sea null o undefined
          this.usuario.foto = base64String;
        }
      });
    }
  }

  convertImageToBase64(file: File, callback: (base64String: string) => void) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      callback(base64String);
    };
    reader.readAsDataURL(file);
  }

  setObjetivoDietetico(value: string) {
    this.usuario.meta = value;
  }

  saveUser(){
    if(this.registerForm.valid){
      console.log(this.usuario)
      this.userApiService.registrarUsuario(this.usuario).subscribe({
        next: (userData) => {
          console.log(userData)
        },
        error : (errorData: any) => {
          console.error(errorData);
          if (errorData && errorData.error && errorData.error.message) {
            // Si el error tiene un mensaje, puedes mostrarlo
            this.formError = errorData.error.message;
          } else {
            // Si no hay un mensaje específico, muestra un mensaje genérico
            this.formError = 'Error al procesar la solicitud';
          }
        },
        complete: () => {
          console.info("Register completo")
          this.router.navigateByUrl('/');
          this.registerForm.reset();
        }
      });
    }else{
      this.registerForm.markAllAsTouched();
      alert("Error de ingreso de datos")
    }
  }
}
