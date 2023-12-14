import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class PostFetchClass extends FetchWrapClass {
  async getByPage(page: number) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}/${page}`
    );
    return response;
  }
  async getById(id: number | string) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}/id/${id}`
    );
    return response;
  }
  async getByAuthorId(id: number, page: number) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}/${id}/${page}`
    );
    return response;
  }
  async getMy(page: number) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}/my/${page}`
    );
    return response;
  }
  async create(title: string, body: string) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}`,
      "POST",
      { title, body }
    );
    return response;
  }
}

export const PostFetch = new PostFetchClass();
