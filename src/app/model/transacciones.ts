import {Prestamo} from './prestamo';


export class Transacciones {
  idTransacciones: number=0;
  montoTransaccion : number;
  fechaTransaccion: Date = new Date();
  tipoTransaccion: string;
  descripcion: string;
  metodoPago: string;
  estadoTransaccion : string;
  prestamo: Prestamo;



}
