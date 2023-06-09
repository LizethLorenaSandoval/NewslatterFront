import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CelulasService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  getCelulas(){
    return this.http.get(`${this.API_URL}/celula`)
  }

  createCelula(body:any){ // Se le pasa un objeto que toma como body en postman para crear el registro
    return this.http.post(`${this.API_URL}/crear_celula`,body)
  }
}
