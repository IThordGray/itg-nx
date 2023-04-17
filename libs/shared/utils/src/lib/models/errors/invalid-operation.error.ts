export class InvalidOperationError extends Error {
  constructor(message?: string) {
    let m = 'Operation not valid';
    if (message) m += `: ${ message }`;
    super(m);
  }
}
