import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SitioService {

  api = 'https://api-lopez-pardo.onrender.com/api/sitios';

  constructor(
    private http: HttpClient
  ) {}

  getSitios() {

    return this.http.get(this.api);

  }

  crearSitio(data: any) {

    return this.http.post(
      this.api,
      data
    );

  }

  eliminarSitio(id: string) {

    return this.http.delete(
      `${this.api}/${id}`
    );

  }

  actualizarSitio(id: string, data: any) {

    return this.http.put(
      `${this.api}/${id}`,
      data
    );

  }

  getSitioById(id:string){

  return this.http.get(
    `${this.api}/${id}`
  );

}



}