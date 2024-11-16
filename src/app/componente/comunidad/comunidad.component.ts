import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-comunidad',
  standalone: true,
    imports: [
        RouterLink,
        NavbarComponent
    ],
  templateUrl: './comunidad.component.html',
  styleUrl: './comunidad.component.css'
})
export class ComunidadComponent {

}
