import axios, {
    type InternalAxiosRequestConfig,
    type AxiosInstance,
} from 'axios';

export class AxiosClient {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({ baseURL });

        this.api.interceptors.request.use((config) => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                return config;
            }

            if (config.method !== 'GET') {
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
                    // Handle logout without circular dependency
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login';
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
        localStorage.setItem('accessToken', accessToken);
    }

    static clearAccessToken() {
        localStorage.removeItem('accessToken');
    }
}

const axiosClient = new AxiosClient(import.meta.env.VITE_API_URL || 'http://localhost:3001');

export default axiosClient;