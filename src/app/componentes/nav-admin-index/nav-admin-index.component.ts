import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-admin-index',
  templateUrl: './nav-admin-index.component.html',
  styleUrls: ['./nav-admin-index.component.scss']
})
export class NavAdminIndexComponent {


  //Variables
  valor: any = 1;

  ngOnInit(){
    console.log(this.valor);
  }

  cambiarValor(){

    if (this.valor == 1){
      this.valor = 0;
    }else if (this.valor = 0) {
      this.valor = 0;
    }
    // this.valor = 0;
    // console.log(this.valor);
  }

}
