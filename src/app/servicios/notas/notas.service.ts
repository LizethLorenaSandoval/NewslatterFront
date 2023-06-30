import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  getNotas(){
    return this.http.get(`${this.API_URL}/nota`)
  }

  createNota(body:any){ // Se le pasa un objeto que toma como body en postman para crear el registro
    return this.http.post(`${this.API_URL}/crear_nota`,body)
  }
}
