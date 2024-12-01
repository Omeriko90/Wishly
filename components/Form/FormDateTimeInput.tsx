import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { View } from "react-native";
import TextInput from "@/components/Input/TextInput";

interface FormDateInputProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  display?: "default" | "compact" | "inline" | "spinner";
  onConfirm: (date: Date) => void;
}

function FormDateTimeInput<T extends FieldValues>(
  props: FormDateInputProps<T>
) {
  const { control, name, placeholder, required, onConfirm, display } = props;
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);

  return (
    <Controller
      name={name}
      rules={{ required: required }}
      control={control}
      render={({ field, fieldState, ...props }) => (
        <View>
          <TextInput
            onPress={() => setOpenDateTimePicker(true)}
            placeholder={placeholder}
          >
            {field.value}
          </TextInput>
          {openDateTimePicker && (
            <DateTimePickerModal
              isVisible
              display={display}
              mode="datetime"
              onConfirm={onConfirm}
              onCancel={() => setOpenDateTimePicker(false)}
            />
          )}
        </View>
      )}
    />
  );
}

export default FormDateTimeInput;
