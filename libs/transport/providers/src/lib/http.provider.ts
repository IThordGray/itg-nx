import { HttpClient } from '@angular/common/http';
import { IRequestMessage, IResponseMessage, ResponseMessage } from '@itg/transport/abstractions';
import { TransportProvider } from '@itg/transport/service';
import { Dictionary } from 'lodash';

export interface IHttpEndpoint {
  endpointUrl: string;
  endpointType: 'GET' | 'PUT' | 'DELETE' | 'POST';
}

export class HttpProvider extends TransportProvider {

  private _endpointOptions: Dictionary<IHttpEndpoint> = {};
  private _baseUrl: string = undefined;

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  private registerEndpoint(messageType: string, options: IHttpEndpoint): void {
    this._endpointOptions[messageType] = { ...options };
  }

  public getEndpointOptions(messageType: string): IHttpEndpoint {
    return this._endpointOptions[messageType];
  }

  public publish(msg: IRequestMessage): void {

    const endpoint: IHttpEndpoint = this.getEndpointOptions(msg.messageType);
    const url: URL = new URL(endpoint.endpointUrl, this._baseUrl);

    switch (endpoint.endpointType) {
      case 'DELETE': {
        // this.httpClient.delete(url, );
        break;
      }
      case 'GET': {
        // this.httpClient.get();
        break;
      }
      case 'POST': {
        // this.httpClient.post();
        break;
      }
      case 'PUT': {
        this.httpClient.put(url.href, msg.payload).subscribe(response => {

          const responseMessage = new ResponseMessage({
            sourceMessageId: msg.messageId,
            payload: response
          });

          this.responseHandler.message = responseMessage;
        });
        break;
      }
    }

  }

  public registerEndpoints(endpoints: Dictionary<IHttpEndpoint> = {}): this {

    for (const messageType of Object.keys(endpoints)) {
      const endpoint: IHttpEndpoint = endpoints[messageType];
      this.registerEndpoint(messageType, endpoint);
    }

    return this;
  }

  public async startAsync(options: { baseUrl: string }): Promise<void> {
    this._baseUrl = options.baseUrl;
    await this._startAsync();
  }

}
