import { Injectable } from '@angular/core';
import * as nativeToast from 'native-toast';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  success(message: string) {
    nativeToast({
      closeOnClick: true,
      message: message,
      position: 'north-east',
      icon: true,
      type: 'success'
    })
  }

  error(message: string) {
    nativeToast({
      closeOnClick: true,
      message: message,
      position: 'north-east',
      icon: true,
      type: 'error'
    })
  }
}
