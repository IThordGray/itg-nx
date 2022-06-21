export class Guid {

  private static readonly _validator: RegExp = new RegExp('^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$', 'i');

  private static newGuid(a?: any): string {
    // @ts-ignore
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.newGuid);
  }

  static empty(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  static new(): string {
    return Guid.newGuid();
  }

  static isEmpty(guid: string): boolean {
    return guid === Guid.empty();
  }

  static isValid(guid: string): boolean {
    return Guid._validator.test(guid);
  }

}
