export class AggregateError extends Error {
  private _errors: Error[] = [];

  get length(): number {
    return this._errors.length;
  }

  constructor() {
    super('One or more errors occurred');
  }

  add(error: Error): AggregateError {
    this._errors.push(error);
    return this;
  }

  get(): Error[] {
    return this._errors;
  }
}
