class UsersExceptionsClass {
  NotFound(message: string) {
    return {
      httpCode: 404,
      message,
    };
  }
}

export const UsersExceptions = new UsersExceptionsClass();
