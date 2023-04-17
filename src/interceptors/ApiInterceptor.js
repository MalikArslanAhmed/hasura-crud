import axios from "axios";

function ApiInterceptor({ children }) {
  axios.interceptors.request.use((config) => {
    config.headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret":
        "qh0XvtmBpH9OfM5G7Avq6NrwPzucdwLdWJTm31MgEQQ36tZ2hK0QXdPc0awnbvKi",
    };
    return config;
  });
  return children;
}
export default ApiInterceptor;
