import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface login {
  nombre: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = environment.API_URL + 'login/';
  // private urlApi = "http://10.0.74.204:4000/api/login/"
  // private urlApi = "http://localhost:4000/api/login/"
  // private urlApi = "http://169.254.108.115:4000/api/login/"
  // private urlApi = "http://192.168.0.150:4000/api/login/"

  constructor(private http: HttpClient, private router: Router) {}

  autenticar(datos: any): Observable<any> {
    return this.http.post(this.urlApi + 'signin', datos);
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(this.urlApi + 'signup', datos);
  }
  cambiar_contrasenia(datos: any) {
    return this.http.put(this.urlApi + 'signup', datos);
  }

  loggedIn() {
    return !!sessionStorage.getItem('token');
  }

  logout() {
    // sessionStorage.removeItem('usuar');
    // sessionStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }

  nombre() {
    return sessionStorage.getItem('nombre');
  }
}
