import { config } from "../config";
import { FetchWrapClass } from "./fetch.wrap";

class NotificationsFetchClass extends FetchWrapClass {
  async get(page: number) {
    const response = await this._fetch(
      `${config.backendApi}notifications/${config.versionPrefix}/${page}`
    );
    return response;
  }
}

export const NotificationsFetch = new NotificationsFetchClass();
