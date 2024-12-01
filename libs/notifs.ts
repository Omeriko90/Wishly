import { safeParseJson } from "@/utils/utils";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

import { Platform } from "react-native";

export const clearBadge = async () => {
  return Notifications.setBadgeCountAsync(0);
};
export const getPermissions = () => {
  return Notifications.getPermissionsAsync();
};
export const requestPermission = () => {
  return Notifications.requestPermissionsAsync();
};

export const getDevicePushToken = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
  const { status } = await getPermissions();
  if (status === "granted" && Device.isDevice) {
    return Notifications.getDevicePushTokenAsync();
  } else {
  }
};
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

let initialized = false;
const init = async () => {
  if (initialized) {
    return;
  }

  initialized = true;

  Notifications.setNotificationHandler({
    handleNotification: async (e) => {
      const {
        request: {
          content: { badge, sound },
        },
      } = e;
      const res = {
        shouldShowAlert: true,
        shouldPlaySound: !!sound,
        shouldSetBadge: !!badge,
      };
      return res;
    },
  });
};
export default {
  init,
  getPermissions,
  getDevicePushToken,
};
