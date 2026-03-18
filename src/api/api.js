import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9020",
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization.headers
  }

  return config;
});
api.interceptors.response.use(
  (response) => response,

  async (error) => {

    if (error.response.status === 401) {

      try {

        const res = await axios.post(
          "http://localhost:9020/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        localStorage.setItem("access_token", newToken);

        error.config.headers.Authorization = `Bearer ${newToken}`;

        return axios(error.config);

      } catch (err) {

        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;