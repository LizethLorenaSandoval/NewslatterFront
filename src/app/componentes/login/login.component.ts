import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login/login.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //Variables 
  login:any=[];

  constructor(
    private LoginService: LoginService,
    private router: Router,
    private fb: UntypedFormBuilder // esto se importa
    ) {}

  public loginForm: UntypedFormGroup = this.fb.group({
    correo: [
      "",
      [Validators.required, Validators.email],
    ],
    contrasena: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
  })


  loginUser(){ // función de iniciar sesión para el botón de ingresar como usuario

    this.login = {
      correo: this.loginForm.value.correo,
      contrasena: this.loginForm.value.contrasena
    }

    try{
      this.LoginService.login(this.login).subscribe((res:any)=>{
        console.log("Objeto ->", res);
        if(res.id_estado_usuario === 0){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Opps, tu usuario esta desactivado, por favor comunicate con el administrador",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        } else if (res.id_estado_usuario !==0 ){
          if (res.statusCode === 200){
            console.log("Login exitoso")
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Login exitoso',
              showConfirmButton: false,
              timer: 1500
            })
            // localStorage.setItem('id_usuario', res.id_usuario);
            this.router.navigate(["/home"]).then(() => window.location.reload());
          }else if (res.statusCode === 403){
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Opps, las credenciales son incorrectas",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Opps, ocurrio un error inesperado",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            });
          }
        }
      })

    }catch (error){
      console.log(error)
    }
    
  }

}
