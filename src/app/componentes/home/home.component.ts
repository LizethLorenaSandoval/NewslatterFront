import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from 'src/app/servicios/notas/notas.service';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent {

	// Variables
	notas: any = {};
	celulas: any = {};
	rows: any = [];


	ngOnInit(){
		this.getCelulas();
		this.getNotas();
	}


// logica para el modal y llamado del servicio
  constructor(
	config: NgbModalConfig, 
	private modalService: NgbModal,
	private notasService: NotasService,
	private celulasService: CelulasService
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	open(content: any) { //el size es opcional, para el tamaño de la modal
		this.modalService.open(content, { size: 'lg' });
	}

	// Servicios 
	getNotas(){
		this.notasService.getNotas().subscribe((res) =>{
				this.notas = res;
				this.notas = this.notas;
				console.log(this.notas);
		})
	}

	getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
				this.celulas = res;
				this.rows = this.celulas;
				console.log(this.rows);
		})
	}

}
