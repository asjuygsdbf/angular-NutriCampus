import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CrearUsuario} from "../../api/user-api/interfaces";
import {UserDataService} from "../../api/user-data/user-data.service";
import {UserApiService} from "../../api/user-api/user-api.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  formError = ""
  usuario: CrearUsuario | undefined;

  router = inject(Router)
  formBuilder = inject(FormBuilder)
  userDataService = inject(UserDataService)
  userApiService = inject(UserApiService)

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    imagen: ['', Validators.required],
    peso: ['', Validators.required],
    talla: ['', Validators.required],
    genero: ['', Validators.required],
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
        console.log('Imagen en base64:', base64String);
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

  saveUser(){}
}
