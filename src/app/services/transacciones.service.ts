import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Transacciones} from '../model/transacciones';


@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
//primero agregar los private de injectamiento
  private url=environment.apiUrl;
  private http:HttpClient=inject(HttpClient);
  private listaCambio  = new Subject<Transacciones[]>();

  constructor() { }

  list():Observable<any> {
    return this.http.get<Transacciones[]>(this.url+"/api/Transacciones/TransaccionesListar");
  }
  listId( id:number):Observable<any> {

    return this.http.get<Transacciones[]>(this.url+"/api/Transacciones/TransaccionModificar"+id);

  }
  insert(garantia:Transacciones): Observable<any> {
    return this.http.post(this.url+"/api/Transacciones/TransaccionInsertar", garantia);
  }

  update(garantia:Transacciones): Observable<any> {
    return this.http.put(this.url+"/api/Transacciones/TransaccionModificar", garantia);
  }

  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/api/Transacciones/TransaccionDelete/"+id);
  }
  setList(listaNueva : Transacciones[]) : void {
    this.listaCambio.next(listaNueva); //enviar la nueva lista a los suscriptores
  }

  getList() : Observable<Transacciones[]> {
    return this.listaCambio.asObservable();
  }

// transacciones.service.ts
  filterByDateRange(startDate: Date, endDate: Date): Observable<Transacciones[]> {
    const formattedStart = startDate.toISOString().split('T')[0];
    const formattedEnd = endDate.toISOString().split('T')[0];
    return this.http.get<Transacciones[]>(`${this.url}/api/TransaccionPeriodo/${formattedStart}/${formattedEnd}`);
  }




  // Nuevo m
  //listTransaccionesPorPeriodo(fechaInicio: string, fechaFin: string): Observable<Transacciones[]> {
  //  return this.http.get<Transacciones[]>(`${this.url}/api/Transacciones/TransaccionPeriodo/${fechaInicio}/${fechaFin}`);
  //}


}
