import { IAlertOptions } from './alert-options.interface';
import { IConfirmOptions } from './confirm-options.interface';
import { INotificationOptions } from './notification-options.interface';
import { IPromptOptions } from './prompt-options.interface';

export interface INotifyProvider {

  showAlertAsync<TOptions extends IAlertOptions>(args: TOptions): Promise<void>;

  showConfirmAsync<TOptions extends IConfirmOptions>(args: TOptions): Promise<boolean>;

  showNotificationAsync<TOptions extends INotificationOptions>(args: TOptions): Promise<void>;

  showPromptAsync<TOptions extends IPromptOptions>(args: TOptions): Promise<unknown>;

}
