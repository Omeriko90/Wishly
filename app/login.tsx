import { ScrollView, View, StyleSheet } from "react-native";
import { Button, Input, Text } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import { isValidEmail } from "@/utils/utils";
import api from "@/libs/api";
import { Link } from "expo-router";
import FormTextInput from "@/components/Form/FormTextInput";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#517fa4",
    width: "100%",
    marginTop: 32,
    height: 50,
    borderRadius: 5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 30,
    marginBottom: 24,
  },
  paragraph: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  registerContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
  },
  form: {
    width: "100%",
  },
  titles: {
    justifyContent: "center",
    alignItems: "center",
  },
});

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: FormData) => {
    const validEmail = isValidEmail(values.email);
    if (!validEmail) {
      if (values.email.length === 0) {
        setError("email", { type: "required", message: "Email is required" });
      } else {
        setError("email", { type: "invalid", message: "Email is invalid" });
      }
    }
    if (values.password.length === 0) {
      setError("password", {
        type: "required",
        message: "Password is required",
      });
    }
    try {
      const response = await api.login(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titles}>
          <Text style={styles.title}>Welcome to Wishly</Text>
          <Text style={styles.paragraph}>
            This is the registeration page for Wishly
          </Text>
        </View>
        <View style={styles.form}>
          <FormTextInput
            placeholder="Email"
            name="email"
            control={control}
            error={errors?.email?.message?.toString()}
            onBlur={() => clearErrors()}
          />
          <FormTextInput
            placeholder="Password"
            name="password"
            control={control}
            error={errors?.password?.message?.toString()}
            onBlur={() => clearErrors()}
          />
          <Button
            title="Login"
            size="lg"
            onPress={handleSubmit(handleLogin)}
            buttonStyle={styles.button}
          />
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <Link style={styles.registerText} href="/register">
            Sign up
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
