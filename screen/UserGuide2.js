import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";

export default function UserGuide2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/chemiz.png")} />
      <Text style={styles.title}>Below is a sample question.</Text>
      <Image
        style={styles.guideImage}
        source={require("../assets/userGuide2.jpg")}
      />
      <Button
        title="Next"
        onPress={() => navigation.navigate("UserGuide3")}
      ></Button>
    </View>
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
  guideImage: {
    width: 310,
    height: 400,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
