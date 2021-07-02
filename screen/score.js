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
// // Importing Stack Navigator library to add multiple activities.
// import { StackNavigator } from "@react-navigation";

export default function Score() {
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.scoreView}>
        <Text>Score</Text>
        <Text>{totalScore} pts</Text>
      </View>
      <View style={styles.cardsView}>
        <View style={styles.topCardView}>
          <View style={styles.correctCardView}>
            <Text style={styles.correctTxt}>{correct}</Text>
            <Text>Correct</Text>
          </View>
          <View style={styles.wrongCardView}>
            <Text style={styles.wrongTxt}>{wrong}</Text>
            <Text>Wrong</Text>
          </View>
        </View>
        <View style={styles.bottomCardView}>
          <Text style={styles.gameModeTxt}>Gamemode</Text>
          <Text>mode</Text>
          <Text style={styles.qnsTxt}>Total Question</Text>
          <Text>Num of question</Text>
        </View>
      </View>
      <View style={styles.btnView}>
          {/* button View */}
          <TouchableOpacity>
              <Text>Play again</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text>Review Answer</Text>
          </TouchableOpacity>
          <TouchableOpacity>
              <Text>Home</Text>
          </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    shadowColor: "grey",
    color: "#F8DE7E",
    backgroundColor: "#FFFFFF",
  },
  cardsView: {
    position: "absolute",
    bottom: 80,
    backgroundColor: "#FFFFFF",
  },
  topCardView: {
    flexDirection: "row",
  },
  correctTxt: {
    color: "green",
  },
  wrongTxt: {
    color: "orange",
  },
  bottomCardView: {
    flexDirection: "row",
  },
  gameModeTxt: {
    color: "skyblue",
  },
  qnsTxt:{
    color: "lightPink",
  },
  correctCardView: {
    flexDirection: "column",
  },
  wrongCardView: {
    flexDirection: "column",
  },
  btnView:{
    flexDirection: "row",
  },
});
