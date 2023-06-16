import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';


@Component({
  selector: 'app-admin-celulas',
  templateUrl: './admin-celulas.component.html',
  styleUrls: ['./admin-celulas.component.scss']
})
export class AdminCelulasComponent {
  // Variables
  celulas: any = [];
  busqueda: any = [] = [];
  _filterRows: any = [];

  ngOnInit() {
    this.getCelulas();
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private CelulasService: CelulasService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    //el size es opcional, para el tamaño de la modal
    this.modalService.open(content, { size: 'lg' });
  }

  // Logica para traer las células
  getCelulas() {
    this.CelulasService.getCelulas().subscribe((res) => {
      this.celulas = res;
      console.log(this.celulas);

      this._filterRows = res;
    });
  }

  // Get y Set del buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }


  filtrarUsuario(busqueda:any) {
    const filterData = this.celulas.filter((celulas:any) =>
      celulas.id_celula.toString().toLowerCase().includes(this.busqueda.toLowerCase()) ||
      celulas.nombre_celula.toLowerCase().includes(this.busqueda.toLowerCase()))

      this.filterRows = filterData;
      console.log("filterData ->",filterData);
  }

}
