import { ExceptionClass } from "../model/exception";

class UsersExceptions extends ExceptionClass {
  constructor(message: string, httpCode: number) {
    super(message, httpCode);
  }
  static NotFound(message: string) {
    return {
      httpCode: 404,
      message,
    };
  }
}

export default UsersExceptions;
