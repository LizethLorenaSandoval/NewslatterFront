import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss']
})
export class AdminContentComponent {

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
