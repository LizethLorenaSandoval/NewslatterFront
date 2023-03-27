import { Component } from '@angular/core';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent {

  // Variables
	celulas: any = {};

  ngOnInit(){
		this.getCelulas();
	}

  constructor(
    private celulasService: CelulasService
    ) {}

  // Servicios de celulas
	getCelulas(){
		this.celulasService.getCelulas().subscribe((res) =>{
				this.celulas = res;
				console.log(this.celulas);
		})
	}
}
