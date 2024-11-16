import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';
import {Transacciones} from '../../../model/transacciones';
import {TransaccionesService} from '../../../services/transacciones.service';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  selector: 'app-transaccion-listar',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatSort,
    MatButton,
    MatHeaderRow,
    MatPaginator,
    RouterLink,
    MatSortHeader,
    MatRow,
    MatRowDef,
    DatePipe,
    MatHeaderRowDef,
    NavbarComponent
  ],
  templateUrl: './transaccion-listar.component.html',
  styleUrl: './transaccion-listar.component.css'
})
export class TransaccionListarComponent {
  lista: Transacciones[]=[];
  displayedColumns: string[]=['idTransacciones', 'montoTransaccion', 'fechaTransaccion', 'tipoTransaccion','descripcion', 'metodoPago', 'estadoTransaccion', 'idPrestamo'];
  dataSource: MatTableDataSource<Transacciones> = new MatTableDataSource<Transacciones>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  transaccionesService: TransaccionesService = inject(TransaccionesService);
  router: Router = inject(Router);
  constructor() {
    console.log("Load constructor!")
  }

  ngAfterViewInit():void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void{
    console.log("Load Lista!");
    this.loadLista();
  }


  private loadLista():void {
    this.transaccionesService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error e en consulta",error),
    });
  }


}
