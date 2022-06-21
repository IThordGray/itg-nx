export interface INotifyProvider {

  showNotificationAsync(title: string, message: string, args: Record<string, unknown>): Promise<void>;

  showAlertAsync(message: string, args: Record<string, unknown>): Promise<void>;

  showConfirmAsync(message: string, args: Record<string, unknown>): Promise<boolean>;

  showPromptAsync(message: string, args: Record<string, unknown>): Promise<unknown>;

}
