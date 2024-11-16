import {Component, inject, ViewChild, viewChild} from '@angular/core';
import {Usuario} from '../../model/usuario';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {UsuarioService} from '../../services/usuario.service';
import {Router, RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [
    MatTable,
    RouterLink,
    MatPaginator,
    DatePipe,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatSort,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatSortHeader,
    NavbarComponent
  ],
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent {

  lista : Usuario[] = [];
  displayedColumns: string[] = ['idUsuario','nombre','telefono','email','nombreRol','enabled'];
  datasourse : MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  usuarioService:UsuarioService = inject(UsuarioService);
  router: Router=inject(Router);
  constructor(){
    console.log('Load Contructor!');
  }

  ngAfterViewInit(){
    this.datasourse.sort=this.sort;
    this.datasourse.paginator=this.paginator;
  }

  ngOnInit():void{
    console.log('Load Lista!');
    this.loadLista();
  }

  private loadLista() {
    this.usuarioService.list().subscribe({
      next: (data: Usuario[]) => {
        // Mapeamos la lista de usuarios para agregar el nombre del rol
        this.datasourse.data = data.map(usuario => ({
          ...usuario,
          nombreRol: usuario.role ? usuario.role.nombreRol : '' // Asigna el nombre del rol o un string vacío
        }));
      },
      error: (error) => console.error("Error en consulta", error),
    });
  }
}
// private Long idUsuario;
//     private String contrasena;
//     private String nombre;
//     private String apellido;
//     private String direccion;
//     private String telefono;
//     private String email;
//
//     private boolean enabled;
//
//     private Rol rol;

//  id: number=0;
//   username: string;
//   password: string;
//   enable: boolean;
