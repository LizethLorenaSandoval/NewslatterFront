import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdminRolService } from 'src/app/servicios/admin-rol/admin-rol.service';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-rol',
  templateUrl: './admin-rol.component.html',
  styleUrls: ['./admin-rol.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class AdminRolComponent {
  // Variables
  crear_rol: any = [];
  rol: any = [];
  busqueda: any = ([] = []);
  _filterRows: any = [];

  ngOnInit() {
    this.getrolesAdmin();
  }

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private AdminRolServices: AdminRolService,
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

  public rolForm: UntypedFormGroup = this.fb.group({
    // validators del form de crear
    nombre_rol: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
  });

  validField(field: string) {
    // validators del form de crear
    return (
      this.rolForm.controls[field].errors &&
      this.rolForm.controls[field].touched
    );
  }

  getrolesAdmin() {
    this.AdminRolServices.getrolesAdmin().subscribe((res) => {
      this.rol = res;
      console.log(this.rol);

      this._filterRows = res;
    });
  }

  createRol() {
    this.crear_rol = {
      nombre_rol: this.rolForm.value.nombre_rol,
    };
    console.log('bjeto ->', this.crear_rol);

    try {
      this.AdminRolServices.createRol(this.crear_rol).subscribe(
        (res: any) => {

          if (this.crear_rol) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Nota creada',
              text: 'Se ha creado el rol',
              showConfirmButton: false,
              timer: 1000,
            });
              this.getrolesAdmin();
              this.modalService.dismissAll();
              this.rolForm.reset();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Opps, ocurrio un error al crear el rol',
              showConfirmButton: true,
              confirmButtonText: 'Ok',
            });
              this.rolForm.reset();
          }

        }
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

  filtrarRol(busqueda: any) {
    const filterData = this.rol.filter(
      (rol: any) =>
        rol.id_rol
          .toString()
          .toLowerCase()
          .includes(this.busqueda.toLowerCase()) ||
        rol.nombre_rol.toLowerCase().includes(this.busqueda.toLowerCase())
    );

    this.filterRows = filterData;
    console.log('filterData ->', filterData);
  }
}
