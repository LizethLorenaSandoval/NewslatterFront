import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';

@Component({
  selector: 'app-admin-tipo-documento',
  templateUrl: './admin-tipo-documento.component.html',
  styleUrls: ['./admin-tipo-documento.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AdminTipoDocumentoComponent {
  // Variables
  tipo_documento: any = [];
  busqueda: any = ([] = []);
  _filterRows: any = [];

  ngOnInit(){
    this.getTipoDoc();
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private TipoDocumentoService: TipoDocumentoService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    //el size es opcional, para el tamaño de la modal
    this.modalService.open(content, { size: 'lg' });
  }

  getTipoDoc() {
    this.TipoDocumentoService.getTipoDoc().subscribe((res) =>{
      this.tipo_documento = res;
      console.log(this._filterRows);

      this._filterRows = res;
    })


  }

  // Get y Set del buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  filtrarDocumento(busqueda:any) {

    const filterData = this.tipo_documento.filter((tipo_documento:any)=>
      tipo_documento.id_tipo_documento.toString().toLowerCase().includes(this.busqueda.toLowerCase()) ||
      tipo_documento.tipo_documento.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      tipo_documento.nombre_tipo_documento.toLowerCase().includes(this.busqueda.toLowerCase())
    )

    this.filterRows = filterData;
    console.log("filterData ->",filterData);
  }
}
