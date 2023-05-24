import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  // Variables
	celulas: any = [];
  tipo_documento: any = [];


  ngOnInit(){
    this.getTipoDoc();
		this.getCelulas();
	}
  
// logica para el modal
constructor(config: NgbModalConfig, 
  private modalService: NgbModal,
  private celulasService: CelulasService,
  private TipoDocumentoService: TipoDocumentoService
  ) {
  // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content: any) { //el size es opcional, para el tamaño de la modal
  this.modalService.open(content);
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
