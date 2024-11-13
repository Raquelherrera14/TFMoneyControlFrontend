import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {Prestamo} from '../model/prestamo';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Prestamoperiodo} from '../model/prestamoperiodo';
import {PrestamoCorrespondiente} from '../model/prestamoCorrespondiente';


@Injectable({
  providedIn: 'root'
})


export class PrestamoService {
    private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Prestamo[]>();
  constructor() {}



  list(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.url}/api/Prestamo/prestamoList`);
  }


  listId(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.url}/api/Prestamo/prestamoModifi/${id}`);
  }

  insert(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${this.url}/api/Prestamo/prestamo`, prestamo).pipe(
      tap(() => {
        this.list().subscribe(data => this.setList(data));
      }),
      catchError(error => {
        console.error('Error inserting prestamo', error);
        throw error;
      })
    );
  }


  update(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.url}/api/Prestamo/prestamoModifi`, prestamo).pipe(
      tap(() => {
        this.list().subscribe(data => this.setList(data));
      }),
      catchError(error => {
        console.error('Error updating prestamo', error);
        throw error;
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/api/Prestamo/prestamoDelete/${id}`).pipe(
      tap(() => {
        this.list().subscribe(data => this.setList(data));
      }),
      catchError(error => {
        console.error('Error deleting prestamo', error);
        throw error;
      })
    );
  }

  setList(listaNueva: Prestamo[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Prestamo[]> {
    return this.listaCambio.asObservable();
  }

  filterByDateRange(startDate: Date, endDate: Date): Observable<Prestamoperiodo[]> {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return this.http.get<Prestamoperiodo[]>(`${this.url}/api/Prestamo/PrestamosPeriodo/${formattedStartDate}/${formattedEndDate}`);
  }

  obtenerPagoCalculado(prestamoId: number): Observable<PrestamoCorrespondiente[]> {
    return this.http.get<PrestamoCorrespondiente[]>(`${this.url}/api/Prestamo/CalcularMonto/${prestamoId}`);
  }

/*
  obtenerPagoCalculado(prestamoId: number): Observable<PrestamoCorrespondiente[]> {
    return this.http.get<PrestamoCorrespondiente[]>(`${this.url}/api/Prestamo//PrestamosPeriodo/{fechaInicio}/{fechaFin}`);
  }*/

}
