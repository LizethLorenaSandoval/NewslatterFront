import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from 'src/app/servicios/notas/notas.service';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { EstadoNotaService } from 'src/app/servicios/estado_nota/estado-nota.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class HomeComponent {

	// Variables
	notas: any = [];
	celulas: any = [];
	estadoNota: any = [];
	rows: any = [];
	// Variables para el buscador
	listFiltered = [];
  	//searchTerm$ = new Subject<string>();


	ngOnInit(){
		this.getEstadoNota();
		this.getCelulas();
		this.getNotas();
	}


// logica para el modal y llamado del servicio
  constructor(
	config: NgbModalConfig, 
	private modalService: NgbModal,
	private notasService: NotasService,
	private celulasService: CelulasService,
	private EstadoNotaService: EstadoNotaService
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	open(content: any) { //el size es opcional, para el tamaño de la modal
		this.modalService.open(content, { size: 'lg' });
	}

	// Servicios de notas
	getNotas(){
		this.notasService.getNotas().subscribe((res) =>{
				this.notas = res;
				console.log(this.notas);
		})
	}

	// Servicios de celulas
	getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
				this.celulas = res;
				console.log(this.celulas);
		})
	}

	// Servicios de estado notas
	getEstadoNota(){
		this.EstadoNotaService.getEstadoNota().subscribe((res) =>{
				this.estadoNota = res;
				console.log(this.estadoNota);
		})
	}

	//Buscador
	// filterList(): void {
	// 	this.searchTerm$.subscribe(term => {
	// 	  this.listFiltered = this.products
	// 		.filter(item => item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0);
	// 	});
	//   }
	// }

}
