class PostsExceptionsClass {
  notFound(message: string = "This post doesn't exist") {
    return { httpCode: 404, message };
  }
}

export const PostsExceptions = new PostsExceptionsClass();
