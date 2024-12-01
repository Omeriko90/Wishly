import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Text, Icon } from "@rneui/themed";
import EventTypeScreen from "./event_type";
import { set, useForm } from "react-hook-form";
import EventDetailsScreen from "@/app/(home)/create/event_details";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function CreateScreen() {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      {/* <View style={styles.container}>{getStep()}</View> */}
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            name="event_type"
            component={EventTypeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Event_Details"
            component={EventDetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </ScrollView>
  );
}

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
