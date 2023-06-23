import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotasService } from 'src/app/servicios/notas/notas.service';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { EstadoNotaService } from 'src/app/servicios/estado_nota/estado-nota.service';
import {
	UntypedFormBuilder,
	UntypedFormControl,
	UntypedFormGroup,
	Validators,
  } from "@angular/forms";
import { of } from "rxjs";

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
	private EstadoNotaService: EstadoNotaService,
	private fb: UntypedFormBuilder
	) {
		// customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
	}

	open(content: any) { //el size es opcional, para el tamaño de la modal
		this.modalService.open(content, { size: 'lg' });
	}

	public notaForm: UntypedFormGroup = this.fb.group({ // validators del form de crear
		titulo: [
		  "",
		  [Validators.required, Validators.minLength(3), Validators.maxLength(70)],
		],
		id_usuario: [
			"",
			[Validators.required],
		  ],
		id_celula: [
		  "",
		  [Validators.required],
		],
		id_estado_nota: [
		  "",
		  [Validators.required],
		],
		descripcion: [
		  "",
		  [Validators.required, Validators.minLength(3), Validators.maxLength(1000)],
		],
	  });

	  validField(field: string) { // validators del form de crear
		return (
		  this.notaForm.controls[field].errors &&
		  this.notaForm.controls[field].touched
		);
	  }
	

	// Servicios de notas
	getNotas(){
		this.notasService.getNotas().subscribe((res) =>{
			this.notas = res;
			console.log(this.notas);

			this._filterRows = res;
		})
	}

	createNota(){
		this.crear_nota = {
			titulo: this.notaForm.value.titulo,
			id_usuario: 6,
			id_celula: this.notaForm.value.id_celula,
			id_estado_nota: this.notaForm.value.id_estado_nota,
			descripcion: this.notaForm.value.descripcion,
		};

		console.log("Objeto ->",this.crear_nota);
		
	}

	// Servicios de celulas
	async getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
			this.celulas = res;
			console.log(this.celulas);
		})
	}

	// Cambia el icono: <3
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

	// Función para buscar notas

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
