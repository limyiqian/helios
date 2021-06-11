import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function Bases() {
  return (
    <View style={styles.container}>
      <Image style={styles.basesImg} source={require("../assets/bases.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
  },
  basesImg: {
    maxWidth: 410,
    maxHeight: 399,
  },
});
