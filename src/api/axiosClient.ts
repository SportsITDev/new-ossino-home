import { STORAGE_KEYS } from 'constants/storage';
import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from 'axios';
import { LocalStorageHelper } from 'helpers/storage';

export class AxiosClient {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({ baseURL });

    this.api.interceptors.request.use((config) => {
      const accessToken = LocalStorageHelper.getItem(STORAGE_KEYS.accessToken);

      if (!accessToken) {
        return config;
      }

      if (config.method !== 'GET') {
        if (config.data instanceof FormData) {
          return config;
        }

        const configWithData: InternalAxiosRequestConfig = {
          ...config,
          data: { ...config.data, accessToken },
        };

        return configWithData;
      }

      const configWithParams: InternalAxiosRequestConfig = {
        ...config,
        params: { ...config.params, accessToken },
      };

      return configWithParams;
    });

    this.api.interceptors.response.use(
      (response) => {
        const { data } = response;
        if (
          data &&
          data.error === true &&
          data.result &&
          data.result.status === '401'
        ) {
          import('../store').then(({ store }) => {
            import('../store/user/slice').then(({ logout }) => {
              store.dispatch(logout());
            });
          });
          return Promise.reject(new Error('Unauthorized'));
        }
        return response;
      },
      (error) => Promise.reject(error)
    );
  }

  protected get client() {
    return this.api;
  }

  static setAccessToken(accessToken: string) {
    LocalStorageHelper.setItem(STORAGE_KEYS.accessToken, accessToken);
  }

  static clearAccessToken() {
    LocalStorageHelper.removeItem(STORAGE_KEYS.accessToken);
  }
}
