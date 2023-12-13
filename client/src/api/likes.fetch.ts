import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class LikesFetchClass extends FetchWrapClass {
  async likePost(postId: number) {
    const response = await this._fetch(
      `${config.backendApi}likes/${config.versionPrefix}/post/${postId}`,
      "POST"
    );
    return response;
  }
  async likeComment(commentId: number) {
    const response = await this._fetch(
      `${config.backendApi}likes/${config.versionPrefix}/comment/${commentId}`,
      "POST"
    );
    return response;
  }
  async isLikedPost(postId: number) {
    const response = await this._fetch(
      `${config.backendApi}likes/${config.versionPrefix}/isLiked/post/${postId}`
    );
    return response;
  }
  async isLikedComment(commentId: number) {
    const response = await this._fetch(
      `${config.backendApi}likes/${config.versionPrefix}/isLiked/comment/${commentId}`
    );
    return response;
  }
}

export const LikesFetch = new LikesFetchClass();
