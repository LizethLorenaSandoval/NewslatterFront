import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CelulasService } from 'src/app/servicios/celulas/celulas.service';
import { TipoDocumentoService } from 'src/app/servicios/tipo_documento/tipo-documento.service';
import { MiperfilService } from 'src/app/servicios/miperfil/miperfil.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { sortRows } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  // Variables
  id_celula: any;
  id_tipo_documento: any;
  celulas: any = []; //Almacena los datos de la tabla celula
  tipo_documento: any = []; //Almacena los datos de la tabla tipo_documento
  misDatos: any = []; //Recorre los datos del usuario para mostrarlos en mi perfil
  editUser: any = []; //Array que guarda datos para el form d editar usuario
  id_usuario: any = localStorage.getItem('id_usuario'); //Variable que se iguala al id_usuario del localStorage y sirve de parametro para traer los datos del usuario

  ngOnInit() {
    this.getTipoDoc();
    this.getCelulas();
    this.getMiPerfil();
  }

  // logica para el modal
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private celulasService: CelulasService,
    private TipoDocumentoService: TipoDocumentoService,
    private MiperfilService: MiperfilService,
    private fb: UntypedFormBuilder // esto se importa
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    //el size es opcional, para el tamaño de la modal
    this.modalService.open(content);
  }

  public editUForm: UntypedFormGroup = this.fb.group({
    // validators del form de editar usuario
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    id_celula: ['', [Validators.required]],
    id_tipo_documento: ['', [Validators.required]],
  });

  validField(field: string) {
    // validators del form de editar
    return (
      this.editUForm.controls[field].errors &&
      this.editUForm.controls[field].touched
    );
  }

  // Servicios de mi perfil
  getMiPerfil() {
    this.MiperfilService.getMiPerfil(this.id_usuario).subscribe((res: any) => {
      this.misDatos = res;
      console.log('Objeto ->', this.misDatos);
      this.id_celula = res[0].id_celula;
      this.id_tipo_documento = res[0].id_tipo_documento;
    });
  }

  editPerfil() {
    this.editUser = {
      nombre: this.editUForm.value.nombre,
      apellido: this.editUForm.value.apellido,
      id_celula: this.id_celula | this.editUForm.value.id_celula,
      id_tipo_documento: this.id_tipo_documento | this.editUForm.value.id_tipo_documento
    };

    console.log('Objeto ->', this.editUser);
  }

  // Servicios de celulas
  getCelulas() {
    this.celulasService.getCelulas().subscribe((res) => {
      this.celulas = res;
      console.log(this.celulas);
    });
  }

  // Servicios de tipo documento
  getTipoDoc() {
    this.TipoDocumentoService.getTipoDoc().subscribe((res) => {
      this.tipo_documento = res;
      console.log(this.tipo_documento);
    });
  }
}
