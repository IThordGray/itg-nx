export interface INotifyProvider {
  showLoader: boolean;

  showNotification(title: string, message: string, ...args: any[]): void;

  showAlert(message: string, ...args: any[]): void;

  showConfirm(message: string, ...args: any[]): Promise<void>;

  showPrompt(message: string, defaultInput: string, ...args: any[]): Promise<any>;

}

export abstract class NotifyService implements INotifyProvider {

  abstract showLoader: boolean;

  abstract showNotification(title: string, message: string, ...args: any[]): void;

  abstract showAlert(message: string, ...args: any[]): void;

  abstract showConfirm(message: string, ...args: any[]): Promise<void>;

  abstract showPrompt(message: string, defaultInput: string, ...args: any[]): Promise<any>;

}