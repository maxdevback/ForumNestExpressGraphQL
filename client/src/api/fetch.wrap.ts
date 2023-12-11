export class FetchWrapClass {
  async _fetch(
    url: string,
    method: "GET" | "POST" | "DELETE" = "GET",
    body?: any
  ) {
    console.log(url);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      credentials: "include",
      body: JSON.stringify(body),
    });
    console.log(response);
    let returnBody;
    try {
      returnBody = await response.json();
    } catch (err) {
      console.log("problem here");
      returnBody = null;
    }
    return {
      status: response.status,
      body: returnBody,
    };
  }
}
