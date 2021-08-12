import { Areas } from "./areas.dto";
import { Prestadores } from "./prestadores.dto";
import { TipoInforme } from "./tipo-informe.dto";
import { Usuarios } from "./usuarios.dto";

export interface PlanificarAuditoria {
    Prestadores: Prestadores[];
    TipoInforme: TipoInforme[];
    Usuarios: Usuarios[];
    Areas: Areas[];
}