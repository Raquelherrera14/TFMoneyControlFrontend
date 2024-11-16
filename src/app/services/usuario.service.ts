import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
//primero agregar los private de injectamiento
  private url=environment.apiUrl;
  private http:HttpClient=inject(HttpClient);
  private listaCambio =new Subject<Usuario[]>();


  constructor() { }

  list():Observable<any> {
    return this.http.get<Usuario[]>(this.url+"/api/Usuario/UsuarioListar");
  }
  listId( id:number):Observable<any> {
    console.log(this.url+"/api/Usuario/ListarUsuarioPorRol/{idRol}"+id)
    return this.http.get<Usuario[]>(this.url+"/api/Usuario/ListarUsuarioPorRol/{idRol}"+id);

  }
  insert(usuario:Usuario): Observable<any> {
    return this.http.post(this.url+"/api/Usuario/UsuarioRegistrar", usuario);
  }

  update(usuario:Usuario): Observable<any> {
    return this.http.put(this.url+"/api/Usuario/UsuarioModificar", usuario);
  }

  delete(id:number):Observable<any> {
    return this.http.delete(this.url+"/api/Usuario/UsuraioDelete/"+id);
  }
  setList(listaNueva : Usuario[]) : void {
    this.listaCambio.next(listaNueva); //enviar la nueva lista a los suscriptores
  }

  getList() : Observable<Usuario[]> {
    return this.listaCambio.asObservable();
  }


}
