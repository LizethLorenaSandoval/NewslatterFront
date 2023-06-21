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
	crear_nota: any = [];
	notas: any = [];
	celulas: any = [];
	estadoNota: any = [];
	busqueda: any = [] = [];
	_filterRows: any = [];
	heart: any = false;

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

			this._filterRows = res;
		})
	}

	// Servicios de celulas
	getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
			this.celulas = res;
			console.log(this.celulas);
		})
	}

	like(heart:any){

		if (this.heart == true){
			this.heart = false;
		}else if (this.heart == false) {
			this.heart = true;
		}
		console.log(heart);
		
	}

	// Servicios de estado notas
	getEstadoNota(){
		this.EstadoNotaService.getEstadoNota().subscribe((res) =>{
			this.estadoNota = res;
			console.log(this.estadoNota);
		})
	}

	// Get y Set del buscador
	get filterRows(): any {
		return this._filterRows;
	}
	
	set filterRows(value) {
		this._filterRows = value;
	}

	filtrarNotas(busqueda:any) {
		const filterData = this.notas.filter((notas:any) =>
		  notas.usuario.toLowerCase().includes(this.busqueda.toLowerCase()) ||
		  notas.nombre_celula.toLowerCase().includes(this.busqueda.toLowerCase()) ||
		  notas.id_nota.toString().toLowerCase().includes(this.busqueda.toLowerCase()) ||
		  notas.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
		  notas.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
		  notas.hora_fecha.toLowerCase().includes(this.busqueda.toLowerCase())
		  )
	
		  this.filterRows = filterData;
		  console.log("filterData ->",filterData);
	  }

}
