import { TipoEval } from "./tipo-eval.dto";

export interface Item {
    Valor: string;
    componente: string;
    descripcion: string;
    descripcionTipoEval: string;
    iditem: string;
    idseccion: string;
    idtipoeval: string;
    tipoEval: TipoEval[];
}