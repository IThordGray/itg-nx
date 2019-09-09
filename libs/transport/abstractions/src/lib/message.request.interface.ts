export interface IRequestMessage {
  messageId: string;
  messageType: string;
  payload: any;
}

export abstract class RequestMessage<T = any> implements IRequestMessage {
  public messageId: string;
  public messageType: string;
  public payload: T;

  constructor(args: Partial<IRequestMessage> = {}) {
    this.messageId = args.messageId;
    this.messageType = args.messageType;
    this.payload = args.payload;
  }
}