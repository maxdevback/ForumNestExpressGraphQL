import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class UserFetchClass extends FetchWrapClass {
  async register(username: string, email: string, password: string) {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}/register`,
      "POST",
      { username, email, password },
    );
    return response;
  }
  async login(username: string, password: string) {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}/login`,
      "POST",
      { username, password },
    );
    return response;
  }
  async getMyData() {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}/my`,
    );
    return response;
  }
  async logout() {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}/logout`,
      "DELETE",
    );
    return response;
  }
  async getByPostId(id: number | string) {
    const response = await this._fetch(
      `${config.backendApi}posts/${config.versionPrefix}/author/${id}`,
    );
    return response;
  }
  async deleteAccount() {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}`,
    );
    return response;
  }
}

export const UserFetch = new UserFetchClass();
