import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class CommentsFetchClass extends FetchWrapClass {
  async getCommentsByPostIdAndPage(postId: number | string, page: number) {
    const response = await this._fetch(
      `${config.backendApi}comments/${config.versionPrefix}/${postId}/${page}`,
    );
    return response;
  }
  async getReplaysByCommentId(
    postId: number | string,
    commentId: number,
    page: number,
  ) {
    const response = await this._fetch(
      `${config.backendApi}comments/${config.versionPrefix}/${postId}/${commentId}/${page}`,
    );
    return response;
  }
  async addComment(postId: number | string, body: string) {
    const response = await this._fetch(
      `${config.backendApi}comments/${config.versionPrefix}/${postId}`,
      "POST",
      { body },
    );
    return response;
  }
  async replay(postId: number | string, body: string, commentParentId: number) {
    const response = await this._fetch(
      `${config.backendApi}comments/${config.versionPrefix}/${postId}`,
      "POST",
      { body, commentParentId },
    );
    return response;
  }
}

export const CommentsFetch = new CommentsFetchClass();
