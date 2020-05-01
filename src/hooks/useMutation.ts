import { useCallback, useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import httpClient from "utils/api";

export interface MutationRequestConfig extends AxiosRequestConfig {
  method?: "put" | "PUT" | "patch" | "PATCH" | "delete" | "DELETE";
}

const useMutation = (
  config?: MutationRequestConfig
): [
  AxiosResponse | undefined,
  () => Promise<void>,
  (customConfig?: MutationRequestConfig) => Promise<AxiosResponse>
] => {
  const [response, setResponse] = useState<AxiosResponse>();

  const request = useCallback(
    (customConfig?: MutationRequestConfig) => {
      return httpClient.request({
        ...config,
        ...customConfig,
      });
    },
    [config]
  );

  const fetch = useCallback(async () => {
    const resp = await request();
    setResponse(resp);
  }, [request]);

  return [response, fetch, request];
};

export default useMutation;
