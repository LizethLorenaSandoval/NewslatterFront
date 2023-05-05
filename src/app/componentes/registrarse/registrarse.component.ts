import { Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
	celulas: any = [];
  tipo_documento: any = [];
  user: any = {};

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


  //Validación de formulario
  public registerForm: UntypedFormGroup = this.fb.group({ //los validators tambien se importan
    nombre:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    documento:[
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(10)]
    ],
    id_celula:[
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)]
    ],
    id_tipo_documento:[
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(10)]
    ],
    correo: [
      '',
      [Validators.required, Validators.email, Validators.minLength(3)]
    ],
    contrasena: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
    ]
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
    return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value ;
  }

  validField(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  //Función para crear el usuario

  crearUsuario(){

        try{
          this.user.nombre = this.registerForm.controls['nombre'].value;
          this.user.apellido = this.registerForm.controls['apellido'].value;  
          this.user.id_celula = this.registerForm.controls['id_celula'].value;
          this.user.id_tipo_documento = this.registerForm.controls['id_tipo_documento'].value;
          this.user.documento = this.registerForm.controls['documento'].value;      
          this.user.correo = this.registerForm.controls['correo'].value;
          this.user.contrasena = this.registerForm.controls['contrasena'].value          

          this.RegistrarseService.registrarUsuario(this.user).subscribe(
            (res:any)=>{

                if (res.exists === false){
                  console.log(this.user.correo, "HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                  Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Te has registrado correctamente',
                  showConfirmButton: true,
                  confirmButtonText: "Listo",
                  timer: 1500
                }); this.router.navigate(['/home']);
                }else {
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Opps, el número de cedula ya se encuentra registrado',
                    showConfirmButton: true,
                    confirmButtonText: "Vale"
                  })
                }
              } 
          ) 
        }catch (error){
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
