import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsuariosService } from 'src/app/servicios/admin-usuarios/admin-usuarios.service';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import { AdminRolService } from 'src/app/servicios/admin-rol/admin-rol.service'

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

export class AdminUsuariosComponent {

  // Variables
  celulas: any = [];
  documento: any = [];
  rol: any = [];
  usuarios: any = [];

  ngOnInit(){
    this.getusuariosAdmin();
    this.getCelulas();
    this.getTipoDoc();
    this.getRoles();
  }

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private AdminUsuariosService: AdminUsuariosService,
    private CelulasService: CelulasService,
    private TipoDocumentoService: TipoDocumentoService,
    private AdminRolService: AdminRolService
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
      console.log(this.usuarios);
    })
  };

  // Otros servicios / Servicios importados

  getTipoDoc(){
    this.TipoDocumentoService.getTipoDoc().subscribe((res)=>{
      this.documento = res;
      console.log(this.documento);
    })
  }

  getCelulas(){
		this.CelulasService.getCelulas().subscribe((res)=>{
      this.celulas = res;
      console.log(this.celulas);
    })
	}

  getRoles(){
    this.AdminRolService.getrolesAdmin().subscribe((res:any)=>{
      this.rol = res;
      console.log(this.rol);
    })
  }

}
