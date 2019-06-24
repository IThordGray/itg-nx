import { INotifyProvider } from '../models/notification.provider.interface';

export class MockNotifyProvider implements INotifyProvider {
    showLoader: boolean;

    showNotification(title: string, message: string, ...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    showAlert(message: string, ...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    showConfirm(message: string, ...args: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    showPrompt(message: string, defaultInput: string, ...args: any[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
}