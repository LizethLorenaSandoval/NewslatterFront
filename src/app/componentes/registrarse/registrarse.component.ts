import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import { RegistrarseService } from 'src/app/servicios/registrarse/registrarse.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { sortRows } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrarseComponent {
  // Variables
  crear_usuario: any = []; //Variable que almacena datos del formulario de creación de usuario
  tipoDocXdefecto: any = 1; //Valor por defecto para el select de estado de la nota
  celulaXdefecto: any = 1; // Valor por defecto para el select de estado de la nota
	celulas: any = []; //Almacena los datos de la tabla celula
  tipo_documento: any = []; //Almacena los datos de la tabla tipo_documento
  // user: any = [];

  ngOnInit():void{
    this.getTipoDoc();
		this.getCelulas();
	}

  constructor(
    private celulasService: CelulasService,
    private TipoDocumentoService: TipoDocumentoService,
    private RegistrarseService: RegistrarseService,
    private router: Router,
    private fb: UntypedFormBuilder // esto se importa
    ) {}

    public registerForm: UntypedFormGroup = this.fb.group({
      // validators del form de crear
      nombre: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      apellido: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      ],
      documento: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(15)],
      ],
      id_celula: ["",[Validators.required]],
      id_tipo_documento: ["",[Validators.required]],
      correo: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
      ],
      contrasena: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
      ],
    },
    {
      validator: this.ConfirmPasswordValidator("contrasena", "confirmPassword")
    })

    ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
      return (formGroup: UntypedFormGroup) => {
        let control = formGroup.controls[controlName];
        let matchingControl = formGroup.controls[matchingControlName]
        if (
          matchingControl.errors &&
          !matchingControl.errors['confirmPasswordValidator']
        ) {
          return;
        }
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
          matchingControl.setErrors(null);
        }
      };
    }

    validPassword() {
      return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value &&
        this.registerForm.controls['contrasena'].value !== '';
    }
  
    validField(field: string) {
      // validators del form de crear
      return (
        this.registerForm.controls[field].errors &&
        this.registerForm.controls[field].touched
      );
    }

  // Servicios de registrarse
  register(){
    this.crear_usuario = {
      nombre: this.registerForm.value.nombre,
      apellido: this.registerForm.value.apellido,
      documento: this.registerForm.value.documento,
      id_celula: this.registerForm.value.id_celula,
      id_tipo_documento: this.registerForm.value.id_tipo_documento,
      correo: this.registerForm.value.correo,
      contrasena: this.registerForm.value.contrasena
    }
    // console.log("Objeto ->", this.crear_usuario)

    try{
      
        this.RegistrarseService.createUsuario(this.crear_usuario).subscribe((res:any)=> {
          if (this.crear_usuario) {
            console.log(res);

            if(res.statusCode==200){
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Te haz registrado correctamente',
                showConfirmButton: false,
                timer: 1000,
              });
                this.registerForm.reset();
            }else if (res.statusCode!=200){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: res.status,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              });
            }
            } 
        })      

    }catch(error){
      console.log(error);
    }
  }  

  // Servicios de celulas
	getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
				this.celulas = res;
				// console.log(this.celulas);
		})
	}

  // Servicios de tipo documento
  getTipoDoc(){
		this.TipoDocumentoService.getTipoDoc().subscribe((res) =>{
				this.tipo_documento = res;
				// console.log(this.tipo_documento);
		})
	}
}
