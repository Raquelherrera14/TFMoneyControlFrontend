import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestDto } from '../model/request-dto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  login(requestDto: RequestDto): Observable<any> {
    console.log("Enviando:", requestDto);
    return this.http.post(this.url + "/authenticate", requestDto, { observe: 'response' }).pipe(
      map((response) => {
        const body = response.body;
        const headers = response.headers;

        // Verifica si el encabezado Authorization está presente
        const bearerToken = headers.get('Authorization');
        if (bearerToken) {
          const token = bearerToken.replace('Bearer ', '').trim();
          console.log("Authorization:", bearerToken);
          localStorage.setItem('token', token);
          return "Ok";
        } else {
          console.warn("El encabezado 'Authorization' no está presente en la respuesta.");
          return null;  // Devuelve null o algún valor que indique que la autenticación falló
        }
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }


}
