import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUsuariosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

   // Aquí se llaman las apis del back

   getusuariosAdmin(){
    return this.http.get(`${this.API_URL}/usuario`)
  }
}
