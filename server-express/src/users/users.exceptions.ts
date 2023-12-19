class UsersExceptionsClass {
  NotFound(message: string) {
    return {
      httpCode: 404,
      message,
    };
  }
  alreadyExist(
    message: string = "A user with that username or email already exists."
  ) {
    return {
      httpCode: 409,
      message,
    };
  }
  wrongPassword() {
    return {
      httpCode: 400,
      message: "The password is wrong",
    };
  }
}

export const UsersExceptions = new UsersExceptionsClass();
