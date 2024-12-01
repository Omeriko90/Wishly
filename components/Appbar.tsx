import { Header } from "@rneui/themed";
import { View } from "react-native";
import { Text } from "@rneui/themed";

function Appbar() {
  return (
    <Header
      leftComponent={{ icon: "menu" }}
      centerComponent={
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 24 }}>Wishly</Text>
        </View>
      }
      style={{
        alignItems: "center",
        height: 90,
        display: "flex",
        justifyContent: "center",
      }}
    />
  );
}

export default Appbar;
