import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource

} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmdialogsesionComponent} from '../../iniciarsesion/confirmdialogsesion/confirmdialogsesion.component';
import {DatePipe} from '@angular/common';
import {Prestamo} from '../../../model/prestamo';
import {PrestamoService} from '../../../services/prestamo.service';
import {NavbarComponent} from '../../navbar/navbar.component';
import {Button} from "primeng/button";


@Component({
  selector: 'app-prestamo-listar',
  standalone: true,
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatPaginator,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatButton,
        RouterLink,
        MatHeaderCellDef,
        DatePipe,
        NavbarComponent,
        Button
    ],
  templateUrl: './prestamo-listar.component.html',
  styleUrl: './prestamo-listar.component.css',

})
export class PrestamoListarComponent implements OnInit, AfterViewInit{
  lista : Prestamo[] = [];
  displayedColumns: string[] = ['idPrestamo',
    'monto', 'tasaInteres', 'fechaInicio',
    'fechaFin', 'estado', 'nombre',
    'accion02', 'accion01'];

  datasource : MatTableDataSource<Prestamo> = new MatTableDataSource<Prestamo>();

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  prestamoService:PrestamoService = inject(PrestamoService);
  router: Router=inject(Router);
  dialog = inject(MatDialog);

  constructor() {
    console.log('Load Contructor!');
  }

  ngAfterViewInit(){
    this.datasource.sort=this.sort;
    this.datasource.paginator=this.paginator;
  }

  ngOnInit():void{
    console.log('Load Lista!');
    this.loadLista();

  }

  private loadLista() {
    this.prestamoService.list().subscribe({
      next: (data: Prestamo[]) => {
        // Mapeamos la lista de usuario para agregar el nombre del prestamo
        this.datasource.data = data.map(prestamo => ({
          ...prestamo,
          nombre: prestamo.usuario ? prestamo.usuario.nombre : '' // Asigna el nombre del rol o un string vacío
        }));
      },
      error: (error) => console.error("Error en consulta", error),
    });
  }
  delete(id:number){
    console.log(id);
    this.prestamoService.delete(id).subscribe(()=>{
      this.loadLista()
    });
  }
  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmdialogsesionComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.delete(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  protected readonly onsubmit = onsubmit;
}
