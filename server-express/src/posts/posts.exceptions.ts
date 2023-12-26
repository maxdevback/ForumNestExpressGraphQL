import { ExceptionClass } from "../model/exception";

class PostsExceptions extends ExceptionClass {
  constructor(message: string, httpCode: number) {
    super(message, httpCode);
    this.message = message;
    this.httpCode = httpCode;
  }
  static notFound(message: string = "This post doesn't exist") {
    return new PostsExceptions(message, 404);
  }
}

export default PostsExceptions;
