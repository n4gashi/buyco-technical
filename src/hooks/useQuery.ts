import { AxiosRequestConfig, AxiosResponse } from "axios";
import httpClient from "utils/api";
import { useState, useCallback } from "react";
import { UserType } from "users";

export interface QueryRequestConfig extends AxiosRequestConfig {
  method?: "get" | "GET" | "post" | "POST";
}

const useQuery = (
  config: QueryRequestConfig
): [
  AxiosResponse<UserType[]> | undefined,
  () => Promise<void>,
  () => Promise<AxiosResponse>
] => {
  const [response, setResponse] = useState<AxiosResponse<UserType[]>>();

  const request = useCallback(() => {
    return httpClient.request(config);
  }, [config]);

  const fetch = useCallback(async () => {
    const resp = await request();
    setResponse(resp);
  }, [request]);

  return [response, fetch, request];
};

export default useQuery;
