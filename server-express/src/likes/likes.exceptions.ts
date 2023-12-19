class LikesExceptionsClass {
  selfLike(message: string = "You can't like yourself") {
    return { httpCode: 400, message };
  }
  alreadyLiked(message: string = "You've already liked it") {
    return { httpCode: 409, message };
  }
}

export const LikesExceptions = new LikesExceptionsClass();
