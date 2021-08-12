
export interface Informe {
    Secciones: string;
    descripcion: string;
    idseccion: string;
    items: [];
    subSecciones?: Informe[];
}