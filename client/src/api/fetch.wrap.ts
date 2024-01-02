export class FetchWrapClass {
  async _fetch(
    url: string,
    method: "GET" | "POST" | "DELETE" = "GET",
    body?: any,
  ) {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      credentials: "include",
      body: JSON.stringify(body),
    });
    let responseCopy = response.clone();
    let returnBody;
    try {
      returnBody = await response.json();
    } catch (err) {
      returnBody = await responseCopy.text();
    }
    return {
      status: response.status,
      body: returnBody,
    };
  }
}
