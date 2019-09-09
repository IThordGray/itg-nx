export interface IResponseMessage {
  sourceMessageId: string;
  payload: any;
}

export class ResponseMessage<T = any> implements IResponseMessage {
  public sourceMessageId: string;
  public payload: T;

  constructor(args: Partial<IResponseMessage> = {}) {
    this.sourceMessageId = args.sourceMessageId;
    this.payload = args.payload;
  }
}