import { Input, InputProps } from "@rneui/themed";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
});

interface Props extends InputProps {}

function TextInput(props: Props) {
  return (
    <Input
      style={styles.input}
      inputContainerStyle={styles.inputContainer}
      {...props}
    />
  );
}

export default TextInput;
