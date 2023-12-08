import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class UserFetchClass extends FetchWrapClass {
  async register(username: string, email: string, password: string) {
    const response = await this._fetch(
      `${config.backendApi}users/${config.versionPrefix}`,
      "POST",
      { username, email, password }
    );
    if (response.status !== 200) return alert(response.body);
    return response.body;
  }
  async login(username: string, password: string) {
    const response = await this._fetch(
      `${config.backendApi}/users/${config.versionPrefix}`,
      "POST",
      { username, password }
    );
    if (response.status !== 200) return alert(response.body);
    return response.body;
  }
}

export const UserFetch = new UserFetchClass();
