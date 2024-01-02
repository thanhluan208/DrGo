import axios from "axios";
import { cloneDeep, isArray, isObject, isString } from "lodash";
import { localStorageFunc } from "../helpers/common";

export const KEY_TOKEN = "token";

const iterateNestObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (isString(obj[key])) {
      obj[key] = obj[key].trim();
    }

    if (isObject(obj[key]) && obj[key] !== null) {
      iterateNestObject(obj[key]);
    }

    if (isArray(obj[key])) {
      obj[key].forEach((eachValue) => {
        if (isString(eachValue)) {
          eachValue.trim();
        }

        if (isObject(eachValue)) {
          iterateNestObject(eachValue);
        }
      });
    }
  });
};

const parseToken = (token) => {
  return `Bearer ${token}`;
};

class HttpService {
  axios;

  constructor() {
    this.axios = axios.create();
    this.axios.defaults.withCredentials = false;

    //! Interceptor request
    this.axios.interceptors.request.use(
      (config) => {
        const nextConfig = cloneDeep(config);
        const token = localStorageFunc?.getItem(KEY_TOKEN) || "";
        config.headers["Authorization"] = parseToken(token);

        const body = nextConfig?.data;
        if (isObject(body)) {
          iterateNestObject(body);
        }
        return nextConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        const statusCode = config.data?.data?.status;
        if (statusCode >= 400 && statusCode <= 499) {
          return Promise.reject(config?.data?.data?.message);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token) {
    this.axios.interceptors.request.use(
      function (config) {
        config.headers["Authorization"] = parseToken(token);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  saveTokenToLocalStorage(token) {
    localStorageFunc?.setItem(KEY_TOKEN, token);
  }

  getTokenFromLocalStorage() {
    const token = localStorageFunc?.getItem(KEY_TOKEN);

    return token;
  }

  removeTokenFromLocalStorage() {
    localStorageFunc?.removeItem(KEY_TOKEN);
  }

  saveItemToLocalStorage(key, value) {
    localStorageFunc.setItem(key, value);
  }
  getItemFromLocalStorage(key) {
    return localStorageFunc.getItem(key);
  }
  removeItemFromLocalStorage(key) {
    localStorageFunc.removeItem(key);
  }

  clearLocalStorage() {
    localStorageFunc.clear();
  }
}

const httpService = new HttpService();
export default httpService;
