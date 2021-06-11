import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  Button,
  
} from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function UserGuide({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={require("../assets/chemiz.png")} />
      <View style={styles.textStyle}>
        <Text style={styles.title}>Welcome to Chemiz!</Text>
        <Text></Text>
        <Text style={styles.textDesc}>
          Chemiz is here to help you to learn the concepts of organic
          chemistry:)
          {"\n"}
          {"\n"}
          There are multiple game modes for you to choose:
        </Text>
        <Text style={styles.header}>Normal</Text>
        <Text style={styles.textDesc}>
          60 seconds per question, once you answer 3 basic questions correctly,
          you will be advanced to the next difficulty.
        </Text>

        <Text style={styles.header}>Random</Text>
        <Text style={styles.textDesc}>
          60 seconds per question, the difficulty will be random for each
          question.
        </Text>

        <Text style={styles.header}>Team</Text>

        <Text style={styles.textDesc}>Play together with your teammates! Same as normal mode.</Text>

        <Text style={styles.header}>Speed</Text>
        <Text>Half the time! 30 seconds per question.</Text>
        <Text></Text>
        
      <Button title="Next" style={styles.button} onPress={()=>navigation.navigate("UserGuide2") }></Button>
      <Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
  },

  textStyle: {
    paddingLeft: 60,
    paddingRight: 50,
  },

  header: {
    fontWeight: "bold",
    paddingTop: 10,
    fontSize: 16,
  },

  textDesc: {
    fontSize: 16,
  },

  button: {
    width: 10,
  },
});
