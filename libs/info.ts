import { Session } from "@/types";
import notifs from "./notifs";
import * as Application from "expo-application";
import { Platform, NativeModules, Dimensions } from "react-native";
import * as Device from "expo-device";

export interface DeviceInfo {
  idfv: string | null;
  version: string;
  updateId?: string | null;
  applicationId: string | null;
  applicationName: string | null;
  nativeApplicationVersion: string | null;
  nativeBuildVersion: string | null;
  modelName: string | null;
  osName: string | null;
  osVersion: string | null;
  osBuildId: string | null;
  installationTime: Date;
  height: number;
  width: number;
  fontScale: number;
  lang: any;
}

export interface RequestInfo {
  time: number;
  timezone: number;
  utm_source?: string;
  session?: Session;
  deviceInfo: DeviceInfo;
  permissions: {
    auth?: boolean;
    pushNotifications?: boolean;
  };
}

export async function getRequestInfo(): Promise<RequestInfo> {
  let [deviceInfo, notifications] = await Promise.all([
    //   config.getAll(),
    getDeviceInfo(),
    notifs.getPermissions(),
  ]);

  return {
    time: new Date().getTime() / 1000,
    timezone: new Date().getTimezoneOffset(),
    deviceInfo,
    permissions: {
      pushNotifications: notifications.granted,
    },
  };
}

export async function getDeviceInfo(): Promise<DeviceInfo> {
  const {
    applicationId,
    applicationName,
    nativeApplicationVersion,
    nativeBuildVersion,
  } = Application;
  const { modelName, osName, osVersion, osBuildId } = Device;
  const [IdForVendor, installationTime] = await Promise.all([
    // TODO: FIX
    Platform.OS === "ios"
      ? Application.getIosIdForVendorAsync()
      : Promise.resolve("xx"),
    Application.getInstallationTimeAsync(),
  ]);
  const { height, width, fontScale } = Dimensions.get("screen");

  const deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const deviceInfo: DeviceInfo = {
    applicationId,
    applicationName,
    nativeApplicationVersion,
    nativeBuildVersion,
    installationTime,
    modelName,
    osName,
    osVersion,
    osBuildId,
    height,
    width,
    fontScale,
    idfv: IdForVendor,
    lang: deviceLanguage,
    version: `${nativeApplicationVersion}.${nativeBuildVersion}`,
  };

  return deviceInfo;
}
