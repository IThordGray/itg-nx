import { Injectable } from '@angular/core';
import { INotifyProvider } from './abstractions/notify-provider.interface';

@Injectable({ providedIn: 'root' })
export class NotifyService implements INotifyProvider {

  async showAlertAsync(message: string, args: Record<string, any>): Promise<void> {
    window.alert(message);
  }

  async showConfirmAsync(message: string, args: Record<string, any>): Promise<boolean> {
    const confirmed = window.confirm(message);
    return confirmed ? Promise.resolve(true) : Promise.reject(false);
  }

  async showNotificationAsync(title: string, message: string, args: Record<string, any>): Promise<void> {
    if (Notification && Notification.permission !== 'denied') {
      await Notification.requestPermission((status) => {

        const notification: Notification = new Notification(title, {
          body: message
        });
      });
    }
  }

  async showPromptAsync(message: string, args: Record<string, any>): Promise<any> {
    const result = window.prompt(message);
    return result !== null && result !== undefined ? Promise.resolve(result) : Promise.reject();
  }

}
