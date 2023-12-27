import { ExceptionClass } from "../model/exception";

class AuthExceptions extends ExceptionClass {
  constructor(message: string, httpCode: number) {
    super(message, httpCode);
  }
  static alreadyExist(
    message: string = "A user with that username or email already exists."
  ) {
    return new AuthExceptions(message, 409);
  }
  static wrongPassword() {
    return new AuthExceptions("The password is wrong", 400);
  }
}

export default AuthExceptions;
