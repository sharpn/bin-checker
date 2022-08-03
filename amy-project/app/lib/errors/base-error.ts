export class BaseError extends Error {
  public readonly message: string;
  public readonly errorCode: string;
  public readonly name: string;
  public readonly statusCode: number;

  constructor(
    message: string,
    opts: { errorCode: string; name: string; statusCode: number },
  ) {
    super(message);
    if (message) this.message = message;

    this.errorCode = opts.errorCode;
    this.name = opts.name;
    this.statusCode = opts.statusCode;
  }
}
