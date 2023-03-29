import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import { RegistrarseService } from 'src/app/servicios/registrarse/registrarse.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrarseComponent {

  // Variables
	celulas: any = {};
  tipo_documento: any = {};
  user: any = {};

  ngOnInit(){
    // this.crearUsuario();
    this.getTipoDoc();
		this.getCelulas();
	}

  constructor(
    private celulasService: CelulasService,
    private TipoDocumentoService: TipoDocumentoService,
    private RegistrarseService: RegistrarseService,
    private fb: UntypedFormBuilder // esto se importa
    ) {}

  // Validación de formulario
  // public registerForm: UntypedFormGroup = this.fb.group({ //los validators tambien se importan
  //   nombre:[
  //     '',
  //     [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
  //   ],
  //   apellido:[
  //     '',
  //     [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
  //   ],
  //   documento:[
  //     '',
  //     [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
  //   ],
  //   id_tipo_documento:[
  //     '',
  //     [Validators.required, Validators.minLength(1), Validators.maxLength(2)]
  //   ],
  //   correo: [
  //     '',
  //     [Validators.required, Validators.email, Validators.minLength(3)]
  //   ],
  //   contrasena: [
  //     '',
  //     [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
  //   ],
  //   confirmPassword: [
  //     '',
  //     [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
  //   ]
  // },
  // {
  //   validator: this.ConfirmPasswordValidator("contrasena", "confirmPassword")
  // }) 

  // ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: UntypedFormGroup) => {
  //     let control = formGroup.controls[controlName];
  //     let matchingControl = formGroup.controls[matchingControlName]
  //     if (
  //       matchingControl.errors &&
  //       !matchingControl.errors['confirmPasswordValidator']
  //     ) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmPasswordValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }

  // validPassword() {
  //   return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value ;
  // }

  // validField(field: string) {
  //   return this.registerForm.controls[field].errors &&
  //     this.registerForm.controls[field].touched
  // }

  // Función para crear el usuario

  // crearUsuario(){
  //   console.log("Me has dado click tio");
    
  // }

  // Servicios de celulas
	getCelulas(): void{
		this.celulasService.getCelulas().subscribe((res) =>{
				this.celulas = res;
				console.log(this.celulas);
		})
	}

  // Servicios de tipo documento
  getTipoDoc(){
		this.TipoDocumentoService.getTipoDoc().subscribe((res) =>{
				this.tipo_documento = res;
				console.log(this.tipo_documento);
		})
	}
}
