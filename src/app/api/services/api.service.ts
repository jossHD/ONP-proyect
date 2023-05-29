import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { proyect, Response } from '../interfaces/intefaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string =
    'https://api-manage-143a4eee-gateway-my-cp4i.mycluster-jlhd-ccc03eca20d26e6ac64511f874a64b9b-0000.us-south.containers.appdomain.cloud/dev-01/qa/ONP_Lab/pensionista/';
  proyect!: proyect;

  valid: number = 0;

  get status() {
    return this.valid;
  }

  get proyecto() {
    return { ...this.proyect };
  }

  constructor(private http: HttpClient) {}

  createCase(idGet: string): Observable<any> {
    const headers = {
      'X-IBM-Client-Id': '96ccac865ca043186617883556983401',
      'X-IBM-Client-Secret': 'c354bd00fb253fc65e30045a0722cd15',
      accept: 'application/json',
    };

    return this.http.get<Response>(this.apiURL+idGet, { headers }).pipe(
      tap((resp) => {
        this.valid = 1;
        this.proyect = {
          id: resp.id,
          nombre: resp.nombre,
          apellidoPaterno: resp.apellidoPaterno,
          apellidoMaterno: resp.apellidoMaterno,
          ultimoAporte: resp.ultimoAporte,
          primerAporte: resp.primerAporte,
          saldo: resp.saldo,
          email: resp.email,
        };
      })
    );
  }
}
