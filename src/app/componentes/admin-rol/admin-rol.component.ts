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
          console.log(this.rol)
        })
      };
}
