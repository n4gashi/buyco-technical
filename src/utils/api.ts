import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { cache } from "./cacheHandler";

const httpClient = axios.create({
  baseURL: "http://localhost:8888",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const responseHandler = (response: AxiosResponse<any>): AxiosResponse<any> => {
  if (response.config.method === "GET" || "get") {
    if (response.config.url) {
      console.log("storing in cache");
      cache.store(response.config.url, JSON.stringify(response.data));
    }
  }
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: AxiosResponse) => {
  if (error.headers?.cached === true) {
    console.log("got cached data in response, serving it directly");
    return Promise.resolve(error);
  }
  return Promise.reject(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const requestHandler = (request: AxiosRequestConfig) => {
  if (request.method === "GET" || "get") {
    const checkIsValidResponse = cache.isValid(request.url || "");
    if (checkIsValidResponse.isValid) {
      console.log("serving cached data");
      request.headers.cached = true;
      request.data = JSON.parse(checkIsValidResponse.value || "{}");
      return Promise.reject(request);
    }
  }
  return request;
};

// httpClient.interceptors.request.use((request) => requestHandler(request));
// httpClient.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => errorHandler(error)
// );

export default httpClient;
