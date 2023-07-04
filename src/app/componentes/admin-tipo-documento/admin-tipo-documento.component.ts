import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-tipo-documento',
  templateUrl: './admin-tipo-documento.component.html',
  styleUrls: ['./admin-tipo-documento.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AdminTipoDocumentoComponent {
  // Variables
  crear_tipo_documento:any = [];
  tipo_documento: any = [];
  busqueda: any = ([] = []);
  _filterRows: any = [];

  ngOnInit(){
    this.getTipoDoc();
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private TipoDocumentoService: TipoDocumentoService,
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

  public tipoDocForm: UntypedFormGroup = this.fb.group({
    // validators del form de crear
    tipo_documento: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(5)],
    ],
    nombre_tipo_documento: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ]
  });

  validField(field: string) {
    // validators del form de crear
    return (
      this.tipoDocForm.controls[field].errors &&
      this.tipoDocForm.controls[field].touched
    );
  }

  getTipoDoc() {
    this.TipoDocumentoService.getTipoDoc().subscribe((res) =>{
      this.tipo_documento = res;
      console.log(this._filterRows);

      this._filterRows = res;
    })
  }

  createTipoDoc(){
    this.crear_tipo_documento = {
      tipo_documento: this.tipoDocForm.value.tipo_documento,
      nombre_tipo_documento: this.tipoDocForm.value.nombre_tipo_documento
    }
    console.log("Objeto ->", this.crear_tipo_documento);

    try{
      this.TipoDocumentoService.createTipoDoc(this.crear_tipo_documento).subscribe((res:any)=>{
        if (this.crear_tipo_documento) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tipo de documento creado',
            text: 'Se ha creado el tipo de documento',
            showConfirmButton: false,
            timer: 1000,
          });
            this.getTipoDoc();
            this.modalService.dismissAll();
            this.tipoDocForm.reset();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Opps, ocurrio un error al crear el tipo de documento',
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          });
            this.tipoDocForm.reset();
        }
      })
    }catch (error){
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
