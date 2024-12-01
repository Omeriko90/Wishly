import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text, Button } from "@rneui/themed";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/Form/FormTextInput";
import FormDateTimeInput from "@/components/Form/FormDateTimeInput";
import { RootNavigatorScreenParams } from "@/types/screens";
import Icon from "@/components/Icon";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  saveText: {
    color: "#9b5d7d",
    fontSize: 16,
    fontWeight: "bold",
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  giftItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  giftImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  giftDetails: {
    flex: 1,
  },
  giftPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  giftStore: {
    fontSize: 14,
    color: "gray",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#e40046",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

type CreateFormValues = {
  type: string;
  date: string;
  name: string;
  description: string;
};

function EventDetailsScreen(props: RootNavigatorScreenParams<"Event_Details">) {
  const { route, navigation } = props;
  const { type } = route.params;
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useForm<CreateFormValues>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>What's the Event</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <FormTextInput
          placeholder="Event Name"
          name="name"
          control={control}
          error={errors?.name?.message?.toString()}
          onBlur={() => clearErrors("name")}
        />
        <FormTextInput
          placeholder="Description"
          name="description"
          multiline={true}
          control={control}
        />

        {/* <TextInput
          placeholder="Quantity"
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        /> */}

        <FormDateTimeInput
          control={control}
          name="date"
          display="inline"
          onConfirm={(date: Date) => console.log(date)}
          placeholder={`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}
        />
      </ScrollView>

      <Button
        title="Add to list"
        buttonStyle={styles.addButton}
        onPress={() => console.log("Added to List")}
      />
    </View>
  );
}

export default EventDetailsScreen;
