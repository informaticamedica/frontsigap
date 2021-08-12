import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ModalCargandoService {

    private _loading: boolean = false;
    private _loadingStatus: BehaviorSubject<any> = new BehaviorSubject(null);

    get loadingStatus(): Observable<boolean> {
        return this._loadingStatus.asObservable();
      }
    get loading(): boolean {
        return this._loading;
    }

    set loading(value) {
        this._loading = value;
        this._loadingStatus.next(value);
    }

    startLoading() {
        this.loading = true;
    }

    stopLoading() {
        this.loading = false;
    }

}