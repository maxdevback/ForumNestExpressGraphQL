export class FetchWrapClass {
  async _fetch(url: string, method: "GET" | "POST" = "GET", body?: any) {
    console.log(url);
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });
    console.log(response.status);
    return {
      status: response.status,
      body: await response.json(),
    };
  }
}
