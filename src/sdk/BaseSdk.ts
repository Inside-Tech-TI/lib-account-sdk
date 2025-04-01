import axios, { AxiosInstance } from "axios";
const axiosInstanceMap = new Map<string, AxiosInstance>();

export abstract class BaseSdk {
  protected axiosInstance: AxiosInstance;

  constructor(protected endpoint: string, protected apiToken: string) {
    this.axiosInstance = getAxiosInstance(endpoint, apiToken);
  }

  protected getAxiosUser(token: string) {
    return getAxiosInstance(this.endpoint, this.apiToken, token);
  }
}

export const getAxiosInstance = (
  baseURL: string,
  apiToken: string,
  userToken?: string
): AxiosInstance => {
  const key: string = `${baseURL}.${apiToken}.${userToken}`;
  if (!axiosInstanceMap.has(key)) {
    const headers: any = {
      "Api-Authorization": `Bearer ${apiToken}`,
      "x-api-key": `${apiToken}`,
    };
    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
    }
    axiosInstanceMap.set(
      key,
      axios.create({
        baseURL,
        headers,
      })
    );
  }

  return axiosInstanceMap.get(key) as AxiosInstance;
};
