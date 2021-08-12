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

  constructor(private http: HttpClient, private router: Router) { }

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
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  nombre() {
    return sessionStorage.getItem('nombre');
  }
}
