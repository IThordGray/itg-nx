import { Injectable } from '@angular/core';
import { IAlertOptions } from './abstractions/alert-options.interface';
import { IConfirmOptions } from './abstractions/confirm-options.interface';
import { INotificationOptions } from './abstractions/notification-options.interface';
import { INotifyProvider } from './abstractions/notify-provider.interface';
import { IPromptOptions } from './abstractions/prompt-options.interface';

@Injectable({ providedIn: 'root' })
export class NotifyService implements INotifyProvider {

  async showAlertAsync<TOptions extends IAlertOptions>(args: TOptions): Promise<void> {
    const { message } = args;
    window.alert(message);
  }

  async showConfirmAsync<TOptions extends IConfirmOptions>(args: TOptions): Promise<boolean> {
    const { message } = args;
    const confirmed = window.confirm(message);
    return confirmed ? Promise.resolve(true) : Promise.reject(false);
  }

  async showNotificationAsync<TOptions extends INotificationOptions>(args: TOptions): Promise<void> {
    const { title, message } = args;
    if (Notification && Notification.permission !== 'denied') {
      await Notification.requestPermission((status) => {

        const notification: Notification = new Notification(title ?? '', {
          body: message
        });
      });
    }
  }

  async showPromptAsync<TOptions extends IPromptOptions>(args: TOptions): Promise<any> {
    const { message } = args;
    const result = window.prompt(message);
    return result !== null && result !== undefined ? Promise.resolve(result) : Promise.reject();
  }

}
