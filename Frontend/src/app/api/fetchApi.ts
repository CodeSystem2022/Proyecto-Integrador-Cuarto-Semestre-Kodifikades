interface RequestOptions {
  method: string;
  body?: any;
  headers: any;
}

export const fetchApi = async (direction: string, config: RequestOptions) => {
  // const BASE_API_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.PRODUCTION_URL
  //     : "http://localhost:3001/api";
  const BASE_API_URL = "https://crud-nextjs-ts.vercel.app/api"
  const url = BASE_API_URL + direction;
  const fullConfig = {
    ...config,
  };
  try {
    const res = await fetch(url, fullConfig);
    const status = res.status;
    const resJSON = await res.json();

    if (status >= 200 && status < 300) return resJSON;
    if (status >= 400) {
      const { Error } = resJSON;
      return {
        error: Error || "Lo sentimos no hemos podido realizar la tarea solicitada.",
      };
    }
  } catch (error) {
    return {
      error: "Lo sentimos no hemos podido realizar la tarea solicitada.",
    };
  }
};