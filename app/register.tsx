import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Button, Input } from "@rneui/themed";
import { Controller, useForm } from "react-hook-form";
import api from "@/libs/api";
import { isValidEmail } from "@/utils/utils";
import { Link } from "expo-router";
import FormTextInput from "@/components/Form/FormTextInput";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    height: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
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
  form: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  signUpContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#517fa4",
    width: "100%",
    marginTop: 32,
    height: 50,
    borderRadius: 5,
  },
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const validateName = (name: string) => {
    if (name.length === 0) {
      setError("name", {
        type: "required",
        message: "You must enter your name.",
      });
      return false;
    }
    return true;
  };

  const validatePassword = (password: string) => {
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
    if (password.length === 0) {
      setError("password", {
        type: "required",
        message: "You must enter your password.",
      });
      return false;
    }
    if (!regex.test(password)) {
      setError("password", {
        type: "pattern",
        message:
          "Password must be at least 5 characters long and contain at least one letter and one number.",
      });
      return false;
    }

    return true;
  };

  const validateForm = (data: FormData) => {
    const validName = validateName(data.name);
    const validEmail = isValidEmail(data.email);
    const validPassword = validatePassword(data.password);

    if (!validEmail) {
      if (data.email.length === 0) {
        setError("email", {
          type: "required",
          message: "You must enter your email.",
        });
      } else {
        setError("email", {
          type: "pattern",
          message: "Invalid email address.",
        });
      }
    }
    return validName && validEmail && validPassword;
  };

  const onSubmit = async (data: FormData) => {
    if (validateForm(data)) {
      try {
        await api.register(data);
      } catch (e) {}
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Wishly</Text>
          <Text style={styles.paragraph}>
            This is the registeration page for Wishly
          </Text>
        </View>

        <View style={styles.form}>
          <FormTextInput
            placeholder="Full Name"
            name="name"
            control={control}
            error={errors?.name?.message?.toString()}
            onBlur={() => clearErrors("name")}
          />
          <FormTextInput
            placeholder="Email"
            name="email"
            control={control}
            error={errors?.email?.message?.toString()}
            onBlur={() => clearErrors("email")}
          />
          <FormTextInput
            placeholder="Password"
            name="password"
            secureTextEntry
            control={control}
            error={errors?.password?.message?.toString()}
            onBlur={() => clearErrors("password")}
          />
          <Button
            title="Submit"
            buttonStyle={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Alreday have an account?</Text>
          <Link style={styles.signUpText} href="/login">
            Sign in
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
