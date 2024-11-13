import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-confirmdialogprestamo',
  standalone: true,
    imports: [
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        NavbarComponent
    ],
  templateUrl: './confirmdialogprestamo.component.html',
  styleUrl: './confirmdialogprestamo.component.css'
})
export class ConfirmdialogprestamoComponent {

}
