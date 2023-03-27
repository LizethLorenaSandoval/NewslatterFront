import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from 'src/app/servicios/notas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent {

	// Variables
	notas: any = {};
	rows: any = [];
	_filterRows: any;

	ngOnInit(){
		this.getNotas();
	}


// logica para el modal y llamado del servicio
  constructor(
	config: NgbModalConfig, 
	private modalService: NgbModal,
	private notasService: NotasService
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
		this.notasService.getData().subscribe((res) =>{
				this.notas = res;
				this._filterRows = this.notas;
				console.log(this.notas);
		})
	}

}
