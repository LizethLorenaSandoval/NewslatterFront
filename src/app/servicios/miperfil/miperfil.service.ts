import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiperfilService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back
  getMiPerfil(id_usuario:any){ // Servicio que trae los datos del usuario
    return this.http.get(`${this.API_URL}/miperfil/${id_usuario}`)
  }

  editPerfil(id_usuario:any, row:any){ // Servicio para editar mi perfil
    return this.http.put(`${this.API_URL}/editarperfil/${id_usuario}`,row);
  }
}
