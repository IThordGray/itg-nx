export class InvalidCastError extends Error {
  constructor(objectName: string, readonly error: ZodError) {
    super(`Failed to cast object to ${objectName}.${error.issues.map(issue => `\n - ${issue.path.join('.')}: ${issue.message}`)}`);
  }
}