export interface INotifyProvider {

  showAlertAsync(message: string, args: Record<string, unknown>): Promise<void>;

  showConfirmAsync(message: string, args: Record<string, unknown>): Promise<boolean>;

  showNotificationAsync(title: string, message: string, args: Record<string, unknown>): Promise<void>;

  showPromptAsync(message: string, args: Record<string, unknown>): Promise<unknown>;

}
