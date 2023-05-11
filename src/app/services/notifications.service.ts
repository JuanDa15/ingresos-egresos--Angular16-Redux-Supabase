import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notyf = new Notyf({
    dismissible: true,
    duration: 3000,
    position: {
      x: 'right',
      y: 'top'
    },
    ripple: true
  })


  success(payload: string) {
    this.notyf.success(payload)
  }

  error(payload: string) {
    this.notyf.error(payload)
  }
}
