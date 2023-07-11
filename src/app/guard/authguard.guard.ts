import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Opps! debes iniciar sesión',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/login']);
      return false;
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      return true;
    }
  }

  
}
