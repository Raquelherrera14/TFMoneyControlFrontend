import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-confirmdialogsesion',
  standalone: true,
    imports: [
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButton,
        MatDialogTitle,
        NavbarComponent
    ],
  templateUrl: './confirmdialogsesion.component.html',
  styleUrl: './confirmdialogsesion.component.css'
})
export class ConfirmdialogsesionComponent {

}
