import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalCargandoService {

    private _loading: boolean = false;
    private _mensaje!: string;
    loadingStatus: Subject<any> = new Subject();
    mensajeValor: Subject<any> = new Subject();

    get loading(): boolean {
        return this._loading;
    }

    set loading(value) {
        this._loading = value;
        this.loadingStatus.next(value);
    }

    public get mensaje(): string {
        return this._mensaje;
    }
    public set mensaje(value: string) {
        this._mensaje = value;
        this.mensajeValor.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }

    setearMensaje(mensaje: string) {
        this.mensaje = mensaje;
    }

}