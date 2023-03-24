import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  
// logica para el modal
constructor(config: NgbModalConfig, private modalService: NgbModal) {
  // customize default values of modals used by this component tree
  config.backdrop = 'static';
  config.keyboard = false;
}

open(content: any) { //el size es opcional, para el tamaño de la modal
  this.modalService.open(content);
}

}
