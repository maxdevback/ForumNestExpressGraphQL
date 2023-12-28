import { ExceptionClass } from './exception';

class NotFoundException extends ExceptionClass {
  constructor(message: string = "This entity doesn't exist") {
    super(message, 404);
  }
}

export { NotFoundException };
