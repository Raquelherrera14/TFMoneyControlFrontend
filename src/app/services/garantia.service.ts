import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Garantia} from '../model/garantia';


@Injectable({
  providedIn: 'root'
})
export class GarantiaService {
//primero agregar los private de injectamiento
  private url=environment.apiUrl;
  private http:HttpClient=inject(HttpClient);
  private listaCambio  = new Subject<Garantia[]>();

  constructor() { }

  list():Observable<any> {
    return this.http.get<Garantia[]>(this.url+ "/api/Garantias/garantiaListar");
  }
  listId( id:number):Observable<any> {

    return this.http.get<Garantia[]>(this.url+ "/api/Garantias/garantiaModicar/"+id);

  }
  insert(garantia:Garantia): Observable<any> {
    return this.http.post(this.url+ "/api/Garantias/garantiaInsertar", garantia);
  }

  update(garantia:Garantia): Observable<any> {
    return this.http.put(this.url+ "/api/Garantias/garantiaModicar", garantia);
  }

  delete(id:number):Observable<any> {
    return this.http.delete(this.url+ "/api/Garantias/garantiaDelete/"+id);
  }
  setList(listaNueva : Garantia[]) : void {
    this.listaCambio.next(listaNueva); //enviar la nueva lista a los suscriptores
  }

  getList() : Observable<Garantia[]> {
    return this.listaCambio.asObservable();
  }


}
