import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import { Link } from "expo-router";
import { SheetManager } from "react-native-actions-sheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },

  login: {
    fontSize: 20,
    textDecorationLine: "none",
    color: "#333",
  },
  register: {},
});

export default function MainScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Wishly!</Text>
        <Text style={styles.paragraph}>
          This is an app for creating and sharing wishlists for any kind of
          event.
        </Text>
        <View>
          <Link asChild href="/login">
            <Button type="solid">Login</Button>
          </Link>
          <Link asChild href="/register">
            <Button type="solid">Register</Button>
          </Link>
          <Link asChild href="/(home)">
            <Button type="solid">Home</Button>
          </Link>
          <Button type="outline" onPress={() => SheetManager.show("hello")}>
            Say Hello
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
