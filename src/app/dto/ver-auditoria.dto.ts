import { Auditoria } from "./auditoria.dto";
import { Informe } from "./informe.dto";
import { Item } from "./item.dto";

export interface VerAuditoria {
    Auditoria: Auditoria;
    Informe: Informe[];
    items: Item[];
}