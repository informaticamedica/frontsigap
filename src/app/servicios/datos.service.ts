import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DatosDbService {
  private urlApi = environment.API_URL + 'datos/';
  // private urlApi = "http://192.168.0.150:4000/api/datos/"
  // private urlApi = "http://localhost:4000/api/datos/"
  // private urlApi = "http://10.0.74.204:4000/api/datos/"

  headers = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
  });

  constructor(private http: HttpClient) { }

  // header = new HttpHeaders().set(
  //   "Authorization",
  //   "Bearer "+ sessionStorage.getItem("token")
  // );

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json' ,
  //     'Authorization': 'Bearer '+ sessionStorage.getItem("token"),
  //     'Accept' : 'application/json'
  //   })
  // };

  DatosApi(base: string): Observable<any> {
    // console.log(sessionStorage.getItem('token'),this.http.);
    return this.http.get(this.urlApi + base, { headers: this.headers });
  }
  DatosParametrosApi(base: string, param: string): Observable<any> {
    // console.log(sessionStorage.getItem('token'),this.http.);
    return this.http.get(this.urlApi + base + '/' + param, {
      headers: this.headers,
    });
  }

  guardarDatosApi(base: string, datos: any): Observable<any> {
    return this.http.post(this.urlApi + base, datos, { headers: this.headers });
  }
  cambiarEstadoAuditoria(idAuditoria: number, idEstado: number): Observable<any> {
    return this.http.put(this.urlApi + 'auditorias/' + idAuditoria + '/estado/' + idEstado, null, { headers: this.headers });
  }
  guardarDatosParametrosApi(
    base: string,
    param: string,
    datos: any
  ): Observable<any> {
    return this.http.post(this.urlApi + base + '/' + param, datos, {
      headers: this.headers,
    });
  }
}
