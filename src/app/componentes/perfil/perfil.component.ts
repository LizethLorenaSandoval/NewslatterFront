import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  // Variables
	celulas: any = {};


  ngOnInit(){
		this.getCelulas();
	}
  
// logica para el modal
constructor(config: NgbModalConfig, 
  private modalService: NgbModal,
  private celulasService: CelulasService
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

}
