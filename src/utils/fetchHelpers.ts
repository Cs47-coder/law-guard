const API_URL = import.meta.env.VITE_LAW_GUARD_API; // Correct way for Vite


interface IRequestOptions {
  method: string;
  headers?: {
    "Content-Type"?: string;
    Authorization?: string;
  };
  body?: string;
}

export const request = async (
  type: string,
  endpoint: string,
  data?: object,
  token?: string
) => {
  const requestProps: IRequestOptions = {
    method: type,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (data) {
    requestProps.body = JSON.stringify(data);
  }

  const response = await fetch(API_URL + endpoint, requestProps);

  if (!response.ok) throw new Error("Network response was not ok");
  const responseData = await response.json();
  return { status: response.status, data: responseData };
};

export const get = async (endpoint: string, token?: string) => {
  return await request("GET", endpoint, undefined, token);
};

export const post = async (endpoint: string, data: object, token?: string) => {
  return await request("POST", endpoint, data, token);
};

export const put = async (endpoint: string, data: object, token?: string) => {
  return await request("PUT", endpoint, data, token);
};

export const deleteRequest = async (endpoint: string, token?: string) => {
  return await request("DELETE", endpoint, undefined, token);
};

export const patch = async (endpoint: string, data: object, token?: string) => {
  return await request("PATCH", endpoint, data, token);
};
