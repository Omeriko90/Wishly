import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { Text, Icon, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

function EventTypeScreen() {
  const navigation = useNavigation();

  const eventTypes = [
    "Birthday",
    "Wedding",
    "Baby shower",
    "Graduation",
    "Housewarming",
    "Holidays",
    "Add custom event",
  ];
  const handleTypeSelect = (type: string) => {
    navigation.navigate("Event_Details", { type });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Close pressed")}>
          <Icon name="x" type="feather" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Event type</Text>
      </View>
      {eventTypes.map((type: string) => (
        <ListItem onPress={() => handleTypeSelect(type)}>
          <ListItem.Content>
            <ListItem.Title>{type}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
}

export default EventTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5EEF6", // Matches the light purple background in the image
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
});
