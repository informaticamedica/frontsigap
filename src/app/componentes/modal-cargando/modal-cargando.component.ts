import { Component, ViewEncapsulation, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';

import { ModalCargandoService } from './modal-cargando.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-modal-cargando',
    templateUrl: 'modal-cargando.component.html',
    styleUrls: ['modal-cargando.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalCargandoComponent implements OnInit, OnDestroy {
    mensajeCargando = 'Cargando...';
    loadingSubscription!: Subscription;
    mensajeSubscription!: Subscription;

    constructor(private modalService: ModalCargandoService,
        private _elmRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._elmRef.nativeElement.style.display = 'none';
        this.loadingSubscription = this.modalService.loadingStatus.subscribe((value) => {
            this._elmRef.nativeElement.style.display = value ? 'block' : 'none';
            this._changeDetectorRef.detectChanges();
            // this.loading = value;
        });
        this.mensajeSubscription = this.modalService.mensajeValor.subscribe((value) => {
            this.mensajeCargando = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
        // this.mensajeSubscription.unsubscribe();
    }

}