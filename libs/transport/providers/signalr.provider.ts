import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { IRequestMessage } from '@itg/transport/abstractions';
import { TransportProvider } from '@itg/transport/service';

export class SignalRProvider extends TransportProvider {

  private _connection: HubConnection;

  constructor() {
    super();
  }

  public publish(msg: IRequestMessage | any): void {
    this._connection.invoke('SendMessage', JSON.stringify(msg));
  }

  public async startAsync(url: string): Promise<void> {

    if (this._connection) {
      await this._connection.stop();
      this._connection = undefined;
    }

    this._connection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    this._connection.start();

    this.subscribeToResponses();

    await this._startAsync();
  }

  private subscribeToResponses() {
    this._connection.on('messageReceived', (e: string) => {
      this.responseHandler.message = JSON.parse(e);
    })
  }

  public async stopAsync(): Promise<void> {
    await this._stopAsync();
  }
}
