import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootHomeScreens = {
  Home: undefined;
  Event_Details: { type: string };
  Event_Types: undefined;
};

export type RootNavigatorScreenParams<Screen extends keyof RootHomeScreens> =
  NativeStackScreenProps<RootHomeScreens, Screen>;
