import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  View,
} from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function DecisionApproach() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/decisionTree.png")} />
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
  },
  image: {
    // marginTop: 100,
    // marginLeft: -1,
    maxHeight: 391,
    maxWidth: 390,
    alignItems: 'center',
  }
});
