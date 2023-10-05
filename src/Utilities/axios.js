import axios from "axios";
import store from "../redux/store";
import config from "../config/config";

const env = 'qa';

const instance = axios.create({
  baseURL: config[env].API_URL,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  let token = store.getState().token;
  config.headers.Authorization = token ? token : "";
  return config;
});
export default instance;
