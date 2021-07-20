import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import * as All from "./Images.js";

function Zoom(props) {
  return (
    <View>
      {<Image style={styles.image} source={All[`${props.imageName}`]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 280,
  },
});

export default Zoom;
