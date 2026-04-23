import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",  //proxy url
});

// interceptors setup

export const setupInterceptors = (getToken: () => Promise<string | null>) => {
  apiClient.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
        console.log(token)
    }

    return config;
  });
};

export default apiClient;