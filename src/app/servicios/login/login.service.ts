import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // Aquí se llaman las apis del back

  login(body:any){ // Se le pasa un objeto que toma como body en postman para validar el usuario
    return this.http.post(`${this.API_URL}/iniciarsesion`,body)
  }
}
