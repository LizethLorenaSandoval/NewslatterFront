import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdminRolService } from 'src/app/servicios/admin-rol/admin-rol.service';

@Component({
  selector: 'app-admin-rol',
  templateUrl: './admin-rol.component.html',
  styleUrls: ['./admin-rol.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AdminRolComponent {

    // Variables
    rol: any = [];
    busqueda: any = [] = [];
    _filterRows: any = [];

    ngOnInit(){
      this.getrolesAdmin();
    }

    constructor(
      config: NgbModalConfig, 
      private modalService: NgbModal,
      private AdminRolServices: AdminRolService
      ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
      }
    
      open(content: any) { //el size es opcional, para el tamaño de la modal
        this.modalService.open(content, { size: 'lg' });
      }

      getrolesAdmin(){
        this.AdminRolServices.getrolesAdmin().subscribe((res) =>{
          this.rol = res;
          console.log(this.rol);

          this._filterRows = res;
        })
      };

  // Get y Set del buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  filtrarRol(busqueda:any) {

    const filterData = this.rol.filter((rol:any)=>
      rol.id_rol.toString().toLowerCase().includes(this.busqueda.toLowerCase()) ||
      rol.nombre_rol.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      rol.nombre_estado_rol.toLowerCase().includes(this.busqueda.toLowerCase())
    )

    this.filterRows = filterData;
    console.log("filterData ->",filterData);
  }
}
