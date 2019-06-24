import { INotifyProvider } from './notification.provider.interface';

export class DefaultNotifyProvider implements INotifyProvider {
  public showLoader: boolean = false;

  showNotification(title: string, message: string, ...args: any[]): void {
    if (Notification && Notification.permission !== 'denied') {
      Notification.requestPermission((status) => {

        const notification: Notification = new Notification(title, {
          body: message
        });
      });
    }
  }

  showAlert(message: string, ...args: any[]): void {
    window.alert(message);
  }

  showConfirm(message: string, ...args: any[]): Promise<void> {
    const confirmed: boolean = window.confirm(message);
    return confirmed ? Promise.resolve() : Promise.reject();
  }

  showPrompt(message: string, defaultInput: string, ...args: any[]): Promise<any> {
    const result: string = window.prompt(message, defaultInput);
    return result !== null && result !== undefined ? Promise.resolve(result) : Promise.reject();
  }

}
