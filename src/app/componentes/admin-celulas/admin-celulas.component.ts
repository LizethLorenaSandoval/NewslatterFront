import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-celulas',
  templateUrl: './admin-celulas.component.html',
  styleUrls: ['./admin-celulas.component.scss']
})
export class AdminCelulasComponent {
  // Variables
  crear_celula:any = [];
  celulas: any = [];
  busqueda: any = [] = [];
  _filterRows: any = [];

  ngOnInit() {
    this.getCelulas();
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private CelulasService: CelulasService,
    private fb: UntypedFormBuilder
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    //el size es opcional, para el tamaño de la modal
    this.modalService.open(content, { size: 'lg' });
  }

  public celulaForm: UntypedFormGroup = this.fb.group({
    // validators del form de crear
    nombre_celula: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(70)],
    ]
  });

  validField(field: string) {
    // validators del form de crear
    return (
      this.celulaForm.controls[field].errors &&
      this.celulaForm.controls[field].touched
    );
  }

  // Logica para traer las células
  getCelulas() {
    this.CelulasService.getCelulas().subscribe((res) => {
      this.celulas = res;
      console.log(this.celulas);

      this._filterRows = res;
    });
  }

  createCelula(){
    this.crear_celula = {
      nombre_celula: this.celulaForm.value.nombre_celula
    }
    console.log("Objeto ->",this.crear_celula);

    try{
      this.CelulasService.createCelula(this.crear_celula).subscribe((res:any)=>{
        if (this.crear_celula) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nota creada',
            text: 'Se ha creado la célula',
            showConfirmButton: false,
            timer: 1000,
          });
            this.getCelulas();
            this.modalService.dismissAll();
            this.celulaForm.reset();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Opps, ocurrio un error al crear la célula',
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          });
            this.celulaForm.reset();
        }
      })
    }catch (error) {
      console.log(error);
    }
    
  }

  // Get y Set del buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }


  filtrarCelula(busqueda:any) {
    const filterData = this.celulas.filter((celulas:any) =>
      celulas.id_celula.toString().toLowerCase().includes(this.busqueda.toLowerCase()) ||
      celulas.nombre_celula.toLowerCase().includes(this.busqueda.toLowerCase()))

      this.filterRows = filterData;
      console.log("filterData ->",filterData);
  }

}
