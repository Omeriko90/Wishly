import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#333",
  },
});

export default function AdminScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView>
        <ThemedText type="title">Hello there!</ThemedText>
        <ThemedText type="subtitle">You are on the admin page</ThemedText>
        <Link href="/(home)" style={styles.button}>
          Go back to Home screen!
        </Link>
      </ThemedView>
    </ParallaxScrollView>
  );
}
