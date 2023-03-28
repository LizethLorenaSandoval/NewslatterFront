import { Component } from '@angular/core';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent {

  // Variables
	celulas: any = {};
  tipo_documento: any = {};

  ngOnInit(){
    this.getTipoDoc();
		this.getCelulas();
	}

  constructor(
    private celulasService: CelulasService,
    private TipoDocumentoService: TipoDocumentoService
    ) {}

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
