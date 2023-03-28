import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  getTipoDoc(){
    return this.http.get(`${this.API_URL}/tipo-documento`)
  }
}
