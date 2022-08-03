import { BaseError } from './base-error';

export class PostcodeNotFound extends BaseError {
  constructor(postcode: string) {
    super(`Postcode: ${postcode} not found`, {
      errorCode: 'POSTCODE_NOT_FOUND',
      name: 'PostcodeNotFound',
      statusCode: 404,
    });
  }
}
