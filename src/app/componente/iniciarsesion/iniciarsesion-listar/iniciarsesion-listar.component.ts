import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Usuario} from '../../../model/usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {ConfirmdialogsesionComponent} from '../confirmdialogsesion/confirmdialogsesion.component';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-iniciarsesion-listar',
  standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatPaginator,
        DatePipe,
        MatSort,
        MatSortHeader,
        MatButton,
        RouterLink,
        NavbarComponent
    ],
  templateUrl: './iniciarsesion-listar.component.html',
  styleUrl: './iniciarsesion-listar.component.css'
})
export class IniciarsesionListarComponent implements OnInit, AfterViewInit {

  lista : Usuario[] = [];
  displayedColumns: string[] = ['idUsuario', 'contrasena', 'nombre', 'apellido', 'direccion', 'telefono', 'email', 'enabled', 'nombreRol','accion01','accion02'];

  datasource : MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  usuarioService:UsuarioService = inject(UsuarioService);
  router: Router=inject(Router);
  dialog = inject(MatDialog);

  constructor(){
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
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => {
        // Mapeamos la lista de usuarios para agregar el nombre del rol
        this.datasource.data = data.map(usuario => ({
          ...usuario,
          nombreRol: usuario.role ? usuario.role.nombreRol : '' // Asigna el nombre del rol o un string vacío
        }));
      },
      error: (error) => console.error("Error en consulta", error),
    });
  }
  delete(id:number){
    console.log(id);
    this.usuarioService.delete(id).subscribe(()=>{
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
