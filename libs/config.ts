import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "base-64";
import { NavigationState } from "@react-navigation/native";
import { safeParseJson } from "@/utils/utils";

export enum ConfigKey {
  TOKEN = "token",
  SETTINGS = "settings",
  CHECKSUMS = "checksums",
  SEEN = "seen",
  LEAKS = "leaks",
  SESSION = "session",
  USER_INFO = "user",
  USE_AUTH = "use_auth",
  //   CAN_LOGIN = 'canLogin',
  DISMISSED = "dismissed",
  STORED_NAV_STATE = "stored_nav_state",
}

export type IConfig = {
  loading: boolean;
  isFree: boolean;
  canLogin: boolean;
  [ConfigKey.USE_AUTH]: boolean | undefined;
  [ConfigKey.TOKEN]: string | null;
  [ConfigKey.SEEN]: { [key: string]: boolean };
  [ConfigKey.CHECKSUMS]: { [key: string]: string };
  [ConfigKey.DISMISSED]: { [key: string]: boolean };
  [ConfigKey.STORED_NAV_STATE]: NavigationState | undefined;
};
export const DEFAULT_CONFIG: { [K in keyof IConfig]: Partial<IConfig[K]> } = {
  loading: true,
  isFree: true,
  canLogin: false,
  [ConfigKey.USE_AUTH]: undefined,
  [ConfigKey.TOKEN]: null,
  [ConfigKey.SEEN]: {},
  [ConfigKey.CHECKSUMS]: {},
  [ConfigKey.DISMISSED]: {},
  [ConfigKey.STORED_NAV_STATE]: undefined,
};

type Parser = {
  get: (value: string) => object | string;
  set: (value: object | string) => string;
};
const jsonParser: Parser = {
  get: (value) => JSON.parse(value),
  set: (value) => JSON.stringify(value),
};
const stringParser: Parser = {
  get: (value) => value,
  set: (value) => value.toString(),
};
const parsers: Record<ConfigKey, Parser> = {
  [ConfigKey.USE_AUTH]: jsonParser,
  [ConfigKey.TOKEN]: stringParser,
  [ConfigKey.SETTINGS]: jsonParser,
  [ConfigKey.SEEN]: jsonParser,
  [ConfigKey.LEAKS]: jsonParser,
  [ConfigKey.SESSION]: jsonParser,
  [ConfigKey.USER_INFO]: jsonParser,
  [ConfigKey.CHECKSUMS]: jsonParser,
  [ConfigKey.DISMISSED]: jsonParser,
  [ConfigKey.STORED_NAV_STATE]: jsonParser,
};
const getParser = (key: ConfigKey) => parsers[key] || jsonParser;
export function decodeToken(
  token: string
): { uid: string; aid: string; salt: string } | null {
  return safeParseJson(base64.decode(token.split(".")[0]));
}

class Config {
  async clear() {
    await AsyncStorage.clear();
  }

  async set(payload: Partial<IConfig>, action: "set" | "merge" = "set") {
    const entries: [string, string][] = Object.entries(payload).map(
      ([key, val]) => [
        key,
        // TODO: improve this logic
        getParser(key).set(val),
      ]
    );
    if (action === "merge") {
      await AsyncStorage.multiMerge(entries);
    } else {
      await AsyncStorage.multiSet(entries);
    }
    const newConfig = await this.getAll();
  }

  async getAll(): Promise<IConfig> {
    const values = await AsyncStorage.multiGet(Object.values(ConfigKey));
    const entries: [string, string][] = values.map(([key, val]) => [
      key,
      // TODO: improve this logic
      getParser(key).get(val) || DEFAULT_CONFIG[key],
    ]);
    return Object.fromEntries(entries) as unknown as IConfig;
  }

  async get(key: ConfigKey) {
    const val = await AsyncStorage.getItem(key);
    return getParser(key).get(val);
  }
  getToken(): Promise<string | null> {
    return AsyncStorage.getItem(ConfigKey.TOKEN);
  }

  setToken(token: string) {
    return AsyncStorage.setItem(ConfigKey.TOKEN, token);
  }

  setSeen(id: string) {
    return AsyncStorage.mergeItem(
      ConfigKey.SEEN,
      parsers[ConfigKey.SEEN].set({ [id]: true })
    );
  }

  setDismissed(id: string, value = true) {
    return AsyncStorage.mergeItem(
      ConfigKey.DISMISSED,
      parsers[ConfigKey.DISMISSED].set({ [id]: value })
    );
  }

  markLeakSeen = (id: string) => {};

  setStoredNavState = (state: NavigationState) => {
    return AsyncStorage.setItem(
      ConfigKey.STORED_NAV_STATE,
      JSON.stringify(state)
    );
  };
  clearStoredNavState = () => {
    return AsyncStorage.removeItem(ConfigKey.STORED_NAV_STATE);
  };
}

const instance = new Config();
export default instance;
