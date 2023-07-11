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
  getMiPerfil(id_usuario:any){
    return this.http.get(`${this.API_URL}/miperfil/${id_usuario}`)
  }
}
