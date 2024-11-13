import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home/home.component';
import {ComofuncionaComponent} from './componente/comofunciona/comofunciona.component';
import {ComunidadComponent} from './componente/comunidad/comunidad.component';
import {InvertirComponent} from './componente/invertir/invertir.component';
import {SingInComponent} from './componente/singin/sing-in.component';
import {RegistrarrolComponent} from './componente/registrarrol/registrarrol.component';

import {GarantiaComponent} from './componente/garantia/garantia-nuevo-edit/garantia.component';
import {GarantiaListarComponent} from './componente/garantia/garantia-listar/garantia-listar.component';
import {
  IniciarsesionNuevoEditComponent
} from './componente/iniciarsesion/iniciarsesion-nuevo-edit/iniciarsesion-nuevo-edit.component';
import {
  IniciarsesionListarComponent
} from './componente/iniciarsesion/iniciarsesion-listar/iniciarsesion-listar.component';
import {TransaccionListarComponent} from './componente/transaccion/transaccion-listar/transaccion-listar.component';
import {
  TransaccionNuevoEditComponent
} from './componente/transaccion/transaccion-nuevo-edit/transaccion-nuevo-edit.component';
import {PrestamoListarComponent} from './componente/prestamo/prestamo-listar/prestamo-listar.component';
import {PrestamoComponent} from './componente/prestamo/prestamo-nuevo-edit/prestamo.component';
import {LoginComponent} from './componente/login/login.component';
import {
  PrestamoFiltroperiodoComponent
} from './componente/prestamo/Prestamo-filtroperiodo/prestamo-filtroperiodo.component';
import {PrestamoCorrespondienteComponent} from './componente/prestamo/prestamo-correspondiente/prestamo-correspondiente.component';
import {TransaccionFiltroperiodo} from './componente/transaccion/transaccion-filtroperiodo/transaccion-filtroperiodo';

export const routes: Routes = [
 {path: '', component: HomeComponent, pathMatch: 'full'},
  {path:'inicio',component:HomeComponent},
{path:'Comofunciona',component:ComofuncionaComponent},
  {path:'Comunidad',component:ComunidadComponent},
  {path:'Invertir',component:InvertirComponent},
  {path:'Garantia',component:GarantiaComponent},
  {path:'Registrarrol',component:RegistrarrolComponent},
  {path:'Iniciarsesion-nuevo-edit',component:IniciarsesionNuevoEditComponent},
  {path:'nuevo-edit',component:IniciarsesionNuevoEditComponent},
  {path:'Iniciarsesion-listar',component:IniciarsesionListarComponent},
  {path:'Iniciarsesion-nuevo-edit/:id',component:IniciarsesionNuevoEditComponent},
  { path: 'Garantia/:id', component:GarantiaComponent },


  {path:'Transaccion', component:TransaccionNuevoEditComponent},
  {path:'Transaccionlistar', component:TransaccionListarComponent},
  {path:'Transaccionperiodo',component:TransaccionFiltroperiodo},

  {path:'Prestamo', component:PrestamoComponent},
  {path:'Prestamo-Listar', component:PrestamoListarComponent},
  {path:'Prestamofiltrado' ,component:PrestamoFiltroperiodoComponent},

  {path: 'prestamo-correspondiente', component:PrestamoCorrespondienteComponent},
  {path: 'login', component: LoginComponent}

];
