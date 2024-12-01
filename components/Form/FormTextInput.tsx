import { Input } from "@rneui/themed";
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { StyleSheet } from "react-native";
import TextInput from "@/components/Input/TextInput";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  error?: string;
  placeholder: string;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
}

function FormTextInput<T extends FieldValues>(props: Props<T>) {
  const {
    control,
    error,
    placeholder,
    secureTextEntry,
    name,
    onBlur,
    multiline,
  } = props;
  return (
    <Controller
      control={control}
      render={({ field }) => (
        <TextInput
          {...field}
          onChangeText={field.onChange}
          onBlur={onBlur}
          multiline={multiline}
          errorMessage={error}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
        />
      )}
      name={name}
    />
  );
}

export default FormTextInput;
