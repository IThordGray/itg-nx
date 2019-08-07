import { IRequestMessage } from '@itg/transport/abstractions';
import { TransportProvider } from '@itg/transport/service';

export class MockTProvider extends TransportProvider {
  publish(msg: IRequestMessage): void {
    this.responseHandler.message = {
      sourceMessageId: msg.messageId,
      payload: undefined
    };
  }

  constructor() {
    super();
  }

  async startAsync(): Promise<void> {
    console.log('Credentials fetched');
    super._startAsync();
  }
}
