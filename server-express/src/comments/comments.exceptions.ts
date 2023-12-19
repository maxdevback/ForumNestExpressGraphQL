class CommentsExceptionsClass {
  notFound(message: string) {
    return {
      httpCode: 404,
      message,
    };
  }
}

export const CommentsExceptions = new CommentsExceptionsClass();
