export abstract class BaseError extends Error {
  protected __proto__: any;

  protected constructor(message?: string) {
    super(message);
  }
}
