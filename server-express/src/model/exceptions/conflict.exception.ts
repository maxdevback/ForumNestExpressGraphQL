import { ExceptionClass } from './exception';

class ConflictException extends ExceptionClass {
  constructor(message: string) {
    super(message, 409);
  }
}

export { ConflictException };
