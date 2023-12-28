import { ExceptionClass } from './exception';

class BadRequestException extends ExceptionClass {
  constructor(message: string) {
    super(message, 400);
  }
}

export { BadRequestException };
