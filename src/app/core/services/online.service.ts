import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  private _isOnline$ = new BehaviorSubject<boolean>(window.navigator.onLine);

  get isOnline$(): Observable<boolean> {
    return this._isOnline$.asObservable();
  }

  constructor() {
    this.listenToOnlineStatus();
  }

  refrescar() {
    this._isOnline$.next(window.navigator.onLine);
  }
  listenToOnlineStatus(): void {
    window.addEventListener('online', () => {
      console.log("estoy online");
      this._isOnline$.next(true)
    });
    window.addEventListener('offline', () => {
      console.log("estoy offline");
      this._isOnline$.next(false)
    });
  }
}