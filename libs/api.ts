import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { DeviceInfo, getRequestInfo } from "./info";
import config from "./config";
import { Platform } from "react-native";

interface Options {
  persist: boolean;
  client: AxiosRequestConfig;
}

export class Api {
  options: Options;
  client: AxiosInstance;

  constructor(options: Options) {
    this.options = options;

    this.client = axios.create({
      withCredentials: false,
      responseType: "json",
      ...options.client,
      validateStatus: (status) => status === 200,
    });

    this.client.interceptors.request.use(async (request) => {
      const headers = await this.getRequestHeaders();
      request.headers = {
        ...request.headers,
        ...headers,
      };
      return request;
    });
  }

  async getAuthorizationHeaders() {
    const token = await config.getToken();
    if (!token) {
      return {};
    }
    return { Authorization: `Bearer ${token}` };
  }

  getUserAgent(deviceInfo: DeviceInfo) {
    const { applicationName, modelName, osVersion, osBuildId, version } =
      deviceInfo;

    if (Platform.OS == "android") {
      // expo-device osName [https://github.com/expo/expo/issues/6990](sometimes returns crap)
      return `${applicationName}/${version} (Android ${osVersion}; ${modelName} ) Mobile`;
    } else {
      const prettyModelName = modelName?.split?.(" ")?.[0];
      const CPU = prettyModelName === "iPhone" ? prettyModelName : "CPU";
      const finalModelName =
        prettyModelName === "Simulator" ? "iPhone" : prettyModelName;

      const userAgent = `${applicationName}/${version} (${finalModelName}; ${CPU} OS ${osVersion} ) Mobile/${osBuildId}`;
      return userAgent;
    }
  }

  async getRequestHeaders() {
    const [{ deviceInfo }, authHeaders] = await Promise.all([
      getRequestInfo(),
      this.getAuthorizationHeaders(),
    ]);

    const userAgent = this.getUserAgent(deviceInfo);
    const infoHeaders = {
      "User-Agent": userAgent,
      id: deviceInfo.applicationId ?? "",
      version: deviceInfo.version,
    };
    return { ...authHeaders, ...infoHeaders };
  }

  async register(data: { email: string; password: string; name: string }) {
    return this.client.post("/register", data);
  }
  async login(data: { email: string; password: string }) {
    return this.client.post("/login", data);
  }
}

const instance = new Api({
  persist: true,
  client: {
    timeout: 10000,
    baseURL: "http://localhost:3000",
  },
});

export default instance;
