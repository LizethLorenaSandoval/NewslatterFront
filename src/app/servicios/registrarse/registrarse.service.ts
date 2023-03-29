import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarseService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  registrarUsuario(){
    return this.http.get(`${this.API_URL}/registrarse`)
  }


  // Validación si el correo existe en base de datos
  // validateUserExists(correo) {
  //   return this.http.get(`${this.API_URL}/register/${correo}`);
  // }
}
