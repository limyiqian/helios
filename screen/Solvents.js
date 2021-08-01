import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default function Solvents() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/solventRevision.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
  },
  image: {
    maxWidth: 400,
    maxHeight: 320,
    alignSelf: "center",
  },
});
