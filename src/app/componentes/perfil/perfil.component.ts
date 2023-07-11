import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import { MiperfilService } from 'src/app/servicios/miperfil/miperfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  // Variables
	celulas: any = [];
  tipo_documento: any = [];
  misDatos:any = [];
  id_usuario:any = localStorage.getItem('id_usuario');


  ngOnInit(){
    this.getTipoDoc();
		this.getCelulas();
    this.getMiPerfil();
	}
  
// logica para el modal
constructor(config: NgbModalConfig, 
  private modalService: NgbModal,
  private celulasService: CelulasService,
  private TipoDocumentoService: TipoDocumentoService,
  private MiperfilService: MiperfilService
  ) {
  // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content: any) { //el size es opcional, para el tamaño de la modal
  this.modalService.open(content);
}

  // Servicios de mi perfil
  getMiPerfil(){
    this.MiperfilService.getMiPerfil(this.id_usuario).subscribe((res:any)=>{
      this.misDatos = res;
      console.log("Objeto ->",this.misDatos);

    })
  }

  // Servicios de celulas
  getCelulas(){
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
