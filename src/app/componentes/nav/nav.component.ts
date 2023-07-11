import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  logOut(){ // Para borrar los datos del localstorage que se almacenan en el login
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Cerrando sesión',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
    
  }

}
