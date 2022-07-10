async function request<TResponse>(
  url: string,
  config: RequestInit,
): Promise<TResponse> {
  const response = await fetch(url, config);
  return await response.json();
}

const api = {
  get: <TResponse>(url: string, config?: RequestInit) =>
    request<TResponse>(url, { method: 'GET', ...config }),

  // Using `extends` to set a type constraint:
  post: <TBody extends BodyInit_, TResponse>(
    url: string,
    body: TBody,
    config?: RequestInit,
  ) => request<TResponse>(url, { method: 'POST', body, ...config }),
};

export { api };
