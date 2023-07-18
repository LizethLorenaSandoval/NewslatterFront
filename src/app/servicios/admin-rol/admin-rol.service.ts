import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminRolService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  getrolesAdmin(){
    return this.http.get(`${this.API_URL}/rol`)
  }

  createRol(body:any){ // Se le pasa un objeto que toma como body en postman para crear el registro
    return this.http.post(`${this.API_URL}/crear_rol`,body)
  }

  getDataById(id_rol:any){ // Trae los roles por el id para usar en ts del delete
    return this.http.get(`${this.API_URL}/rolid/${id_rol}`);
  }

  deleteRol(id_rol:any){ // Se le pasa el id del rol a eliminar
    return this.http.delete(`${this.API_URL}/eliminarrol/${id_rol}`)
  }
}
