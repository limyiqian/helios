import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

export default function UserGuide3({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={require("../assets/chemiz.png")} />
      <Text style={styles.title}>
        After finishing the quiz, you can review all the questions you have
        attempted and see your total score.
      </Text>
      {/* <Image style={styles.image} source={require("../assets/points.jpg")} /> */}
      <Text style={styles.title}>That's it from us.</Text>
      <Image
        style={styles.congrats}
        source={require("../assets/keepCalm.jpg")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.btnText}>Exit</Text>
      </TouchableOpacity>
      <Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },
  congrats: {
    width: 150,
    height: 200,
    alignSelf: "center",
    margin: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 70,
    height: 30,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  btnText: {
    textAlign: "center",
    marginTop: 5,
    color: "#000000",
  },
});
