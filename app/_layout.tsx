import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigationState,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SheetProvider } from "react-native-actions-sheet";
import "./sheets.ts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const navigationState = useNavigationState((state) => state.key);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (navigationState) {
      router.push("/(home)");
    }
  }, [navigationState]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SheetProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />

            {/* <Stack.Screen name="profile" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="events" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="lists" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="create" options={{ headerShown: false }} /> */}
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </SheetProvider>
    </SafeAreaProvider>
  );
}
