import { IRequestMessage } from '@itg/transport/abstractions';
import { TransportProvider } from '@itg/transport/service';

export class MockTProvider extends TransportProvider {
  publish(msg: IRequestMessage): void {
    this.responseHandler.message = {
      sourceMessageId: msg.messageId
    };
  }

  constructor() {
    super();
  }

  async startAsync(): Promise<void> {
    super.startAsync(() => {
      console.log('Credentials fetched');
    });
  }
}
