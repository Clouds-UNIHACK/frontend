import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
const BASE_URL = "http://127.0.0.1:8000";

/**
 * Possible API methods to be used when doing requests
 */
export enum RequestMethod {
  Delete = "DELETE",
  Get = "GET",
  Patch = "PATCH",
  Post = "POST",
  Put = "PUT",
}

export interface RequestData {
  headers?: Record<string, string>;
  human_image?: File | Blob;
  cloth_image?: File | Blob;
  data?: Record<string, any>;
  config?: AxiosRequestConfig;
}

export interface InternalRequest extends RequestData {
  fullRoute: RouteLike;
  method: RequestMethod;
}

export interface InternalResponse {
  image_url?: string;
  success?: boolean;
  data?: any;
  access_token?: string;
}

export type RouteLike = `${string}`;

export class RestClient {
  private readonly axiosInstance: AxiosInstance;

  public constructor(axios: AxiosInstance) {
    this.axiosInstance = axios;
  }

  /**
   * Runs a get request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async get(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Get });
  }

  /**
   * Runs a delete request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async delete(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({
      ...options,
      fullRoute,
      method: RequestMethod.Delete,
    });
  }

  /**
   * Runs a post request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async post(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Post });
  }

  /**
   * Runs a put request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async put(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Put });
  }

  /**
   * Runs a patch request from the api
   *
   * @param fullRoute - The full route to query
   * @param options - Optional request options
   */
  public async patch(fullRoute: RouteLike, options: RequestData = {}) {
    return this.request({ ...options, fullRoute, method: RequestMethod.Patch });
  }

  /**
   * Runs a request from the api
   *
   * @param options - Request options
   */
  public async request(options: InternalRequest): Promise<InternalResponse> {
    let request: AxiosResponse<any, any>;
    try {
      request = await this.raw(options);
    } catch (err: any) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
        }
        return { success: false, data: (error.response.data as any).data };
      }
      return { success: false, data: error.message };
    }
    return request.data;
  }

  /**
   * Runs a request from the API, yielding the raw Response object
   *
   * @param options - Request options
   */
  async raw(options: InternalRequest) {
    const config: AxiosRequestConfig = {
      ...options.config,
      url: options.fullRoute,
      method: options.method,
    };

    console.log(options);
    config.headers = options.headers || Object.create(null);
    console.log(config.headers);
    const token = localStorage.getItem("accessToken") || "";
    if (token) config.headers!["Authorization"] = "Bearer " + token;
    console.log(token);
    config.headers!["Access-Control-Allow-Origin"] = "*";

    config.withCredentials = true;
    console.log(config);

    if (options.method == RequestMethod.Post) config.data = options.data;
    else
      config.params = { ...((config.params as object) || {}), ...options.data };

    return await this.axiosInstance.request(config);
  }
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

const restClient = new RestClient(axiosInstance);

export default restClient;
