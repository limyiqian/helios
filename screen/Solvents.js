import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default function Solvents() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/solventRevision.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
  },
  image: {
    marginBottom: 100,
    marginTop: 5,
    maxWidth: 390,
    maxHeight: 310,
    alignSelf: "center",
  },
});
