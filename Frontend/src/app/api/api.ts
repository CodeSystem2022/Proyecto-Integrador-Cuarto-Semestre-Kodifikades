import { fetchApi } from "./fetchApi";

export const getConfig = async (direction: string, token?: string) => {
  return await fetchApi(direction, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token || ""}`,
    },
  });
};

export const postConfig = async (direction: string, data: any = {}, token?: string) => {
  return await fetchApi(direction, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token || ""}`,
    },
    body: JSON.stringify({ ...data }),
  });
};

export const patchConfig = async (direction: string, data: any = {}, token?: string) => {
  return await fetchApi(direction, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `bearer ${token}` : "",
    },
    body: JSON.stringify(data),
  });
};

export const putConfig = async (direction: string, data: any = {}, token?: string) => {
  return await fetchApi(direction, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token || ""}`,
    },
    body: JSON.stringify(data),
  });
};