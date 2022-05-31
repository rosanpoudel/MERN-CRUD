import axios from "axios";
import LocalDB from "../helpers/localStorage";
import { ApiBasePath } from "../helpers/globalConstants";

const ApiBase = () => {
  const defaultOptions = {
    baseURL: ApiBasePath.BASE_PATH,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = LocalDB.getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default ApiBase();
