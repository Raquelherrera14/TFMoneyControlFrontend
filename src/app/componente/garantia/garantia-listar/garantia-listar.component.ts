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
import {Garantia} from '../../../model/garantia';
import {MatDialog} from '@angular/material/dialog';
import {GarantiaService} from '../../../services/garantia.service';
import {Usuario} from '../../../model/usuario';
import {ConfirmdialogsesionComponent} from '../../iniciarsesion/confirmdialogsesion/confirmdialogsesion.component';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-garantia-listar',
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
        NavbarComponent
    ],
  templateUrl: './garantia-listar.component.html',
  styleUrl: './garantia-listar.component.css',

})

export class GarantiaListarComponent implements OnInit, AfterViewInit{
  lista : Garantia[] = [];
  displayedColumns: string[] = ['idGarantia', 'tipoGarantia', 'descripcion', 'valorGarantia', 'email','accion01','accion02']

  datasource : MatTableDataSource<Garantia> = new MatTableDataSource<Garantia>();

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  garantiaService:GarantiaService = inject(GarantiaService);
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
    this.garantiaService.list().subscribe({
      next: (data: Garantia[]) => {
        // Mapeamos la lista de usuarios para agregar el nombre del rol
        this.datasource.data = data.map(garantia => ({
          ...garantia,
          email: garantia.usuario ? garantia.usuario.email : '' // Asigna el nombre del rol o un string vacío
        }));
      },
      error: (error) => console.error("Error en consulta", error),
    });
  }
  delete(id:number){
    console.log(id);
    this.garantiaService.delete(id).subscribe(()=>{
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
}
