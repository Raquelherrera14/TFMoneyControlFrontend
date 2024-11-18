import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TreeSelectModule} from 'primeng/treeselect';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {GarantiaListarComponent} from '../garantia-listar/garantia-listar.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {GarantiaService} from '../../../services/garantia.service';
import {Usuario} from '../../../model/usuario';
import {Garantia} from '../../../model/garantia';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-garantia',
  standalone: true,
    imports: [
        Button,
        InputTextModule,
        TreeSelectModule,
        RouterLink,
        GarantiaListarComponent,
        RouterOutlet,
        ReactiveFormsModule,
        NavbarComponent
    ],
  templateUrl: './garantia.component.html',
  styleUrl: './garantia.component.css'
})
export class GarantiaComponent {


  garantiaForm: FormGroup;
  fb = inject(FormBuilder);
  garantiaService: GarantiaService = inject(GarantiaService);
  router: Router = inject(Router);

  //EDICION
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.garantiaForm=this.fb.group({
      idGarantia: [''],
      tipoGarantia: ['',Validators.required],
      descripcion: ['',Validators.required],
      valorGarantia: ['',Validators.required],
      idUsuario: ['', Validators.required],

    })
  }

  ngOnInit() {
    this.route.params.subscribe((data) => {
      console.log("ngOnInit de GarantiaComponent");
      console.log(data);
      this.id= data['id'];
      this.edicion = data['id'] != null;
      this.cargaForm();

    });

  }

  private cargaForm() {
    if(this.edicion){

      this.garantiaService.listId(this.id).subscribe((data:Garantia) => {

        console.log(data);
        this.garantiaForm.patchValue({
          tipoGarantia: data.tipoGarantia,
          descripcion: data.descripcion,
          valorGarantia: data.valorGarantia,
          idUsuario: data.usuario?.idUsuario,

          //tipoGarantia: string;
          //   descripcion: string;
          //   valorGarantia: string;
          //   usuario: Usuario;

        });

      })
    }
  }

  onsubmit(){

    if(this.garantiaForm.valid){
      const garantia: Garantia = new Garantia();
      garantia.idGarantia = this.id;
      garantia.tipoGarantia = this.garantiaForm.value.tipoGarantia;
      garantia.descripcion = this.garantiaForm.value.descripcion;
      garantia.valorGarantia = this.garantiaForm.value.valorGarantia;

      garantia.usuario = new Usuario();
      garantia.usuario.idUsuario = this.garantiaForm.value.idUsuario;



      console.log(garantia);

      if(!this.edicion){
        this.garantiaService.insert(garantia).subscribe((data:Object):void => {
          this.garantiaService.list().subscribe(data=>{
            this.garantiaService.setList(data);

          });

        });
      } else{
        console.log("Datos aceptdos",garantia);
        this.garantiaService.update(garantia).subscribe((data:Object):void => {
          this.garantiaService.list().subscribe(data=>{
            this.garantiaService.setList(data);
          })
        });
      }
      this.router.navigate(['Garantia-listar']);
      console.log("Formulario valido");

    }else {
      console.log("Formulario no valido");
      alert("Formulario no valido")
    }

  }


}
