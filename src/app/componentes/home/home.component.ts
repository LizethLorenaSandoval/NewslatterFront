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
} from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class HomeComponent {
  // Variables
  crear_nota: any = [];
  notas: any = [];
  celulas: any = [];
  estadoNota: any = [];
  busqueda: any = ([] = []);
  _filterRows: any = [];
  heart: any = false;
  celulaXdefecto:any = 1; //Valor por defecto para el select usado en en [(ngModel)]
  estadoXdefecto:any = 0; //Valor por defecto para el select usado en en [(ngModel)]

  ngOnInit() {
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

  open(content: any) {
    //el size es opcional, para el tamaño de la modal
    this.modalService.open(content, { size: 'lg' });
  }

  public notaForm: UntypedFormGroup = this.fb.group({
    // validators del form de crear
    titulo: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    id_celula: ["", [Validators.required]],
    estado_nota: ["", [Validators.required]],
    descripcion: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(999),
      ],
    ]
  });

  validField(field: string) {
    // validators del form de crear
    return (
      this.notaForm.controls[field].errors &&
      this.notaForm.controls[field].touched
    );
  }

  // Servicios de celulas
  async getCelulas() {
    this.celulasService.getCelulas().subscribe((res) => {
      this.celulas = res;
      console.log(this.celulas);
    });
  }

  // Cambia el icono: <3
  like(heart: any) {
    if (this.heart == true) {
      this.heart = false;
    } else if (this.heart == false) {
      this.heart = true;
    }
    console.log(heart);
  }

  // Servicios de estado notas
  async getEstadoNota() {
    this.EstadoNotaService.getEstadoNota().subscribe((res) => {
      this.estadoNota = res;
      console.log(this.estadoNota);
    });
  }

  // Servicios de notas
  getNotas() {
    this.notasService.getNotas().subscribe((res) => {
      this.notas = res;
      console.log(this.notas);

      this._filterRows = res;
    });
  }

  createNota() {
    this.crear_nota = {
      titulo: this.notaForm.value.titulo,
      id_celula: this.notaForm.value.id_celula,
      estado_nota: this.notaForm.value.estado_nota,
      id_usuario: 6,
      descripcion: this.notaForm.value.descripcion
    };

    console.log('Objeto ->', this.crear_nota);
	
    try {
      this.notasService.createNota(this.crear_nota).subscribe(
        (res: any) => {
          // console.log('res ->', res);

          if (this.crear_nota) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Nota creada',
              text: 'Se ha creado la nota',
              showConfirmButton: false,
              timer: 1000,
            });
              window.location.reload();
              this.notaForm.reset();
              this.modalService.dismissAll();
              this.getNotas();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Opps, ocurrio un error al crear la nota',
              showConfirmButton: true,
              confirmButtonText: 'Ok',
            });
              this.notaForm.reset();
          }
        },
        (err) => console.log(err)
      );
    } catch (error) {
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

  // Función para buscar notas

  filtrarNotas(busqueda: any) {
    const filterData = this.notas.filter(
      (notas: any) =>
        notas.usuario.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        notas.nombre_celula
          .toLowerCase()
          .includes(this.busqueda.toLowerCase()) ||
        notas.id_nota
          .toString()
          .toLowerCase()
          .includes(this.busqueda.toLowerCase()) ||
        notas.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        notas.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        notas.hora_fecha.toLowerCase().includes(this.busqueda.toLowerCase())
    );

    this.filterRows = filterData;
    console.log('filterData ->', filterData);
  }
}
