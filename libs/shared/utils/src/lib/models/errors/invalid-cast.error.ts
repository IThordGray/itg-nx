export class InvalidCastError extends Error {
  constructor(objectName: string) {
    super(`Failed to cast object to ${ objectName }`);
  }
}