import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsuariosService } from 'src/app/servicios/admin-usuarios/admin-usuarios.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class AdminUsuariosComponent {

  // Variables
  usuarios: any = [];

  ngOnInit(){
    this.getusuariosAdmin();
  }

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private AdminUsuariosService: AdminUsuariosService
    ) {
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
    }
  
    open(content: any) { //el size es opcional, para el tamaño de la modal
      this.modalService.open(content, { size: 'lg' });
    }

  // Logica para traer los usuarios 

  getusuariosAdmin(){
    this.AdminUsuariosService.getusuariosAdmin().subscribe((res) =>{
      this.usuarios = res;
      console.log(this.usuarios)
    })
  };



  // getCelulas(){
	// 	this.celulasService.getCelulas().subscribe((res) =>{
	// 			this.celulas = res;
	// 			console.log(this.celulas);
	// 	})
	// }

}
