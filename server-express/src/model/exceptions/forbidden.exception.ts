import { ExceptionClass } from './exception';

class ForbiddenException extends ExceptionClass {
  constructor() {
    super('Auth first', 403);
  }
}

export { ForbiddenException };
