import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import * as All from "./Images.js";

export default function Play({ navigation, route }) {
  const { difficulty, gamemode } = route.params;
  const [currentQuestionNo, setCurrentQuestionNo] = useState("");
  const [currentDifficulty, setCurrentDifficulty] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentStartingMaterial, setCurrentStartingMaterial] = useState("");
  const [currentNucleophile, setCurrentNucleophile] = useState("");
  const [currentSolvent, setCurrentSolvent] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentProduct2, setCurrentProduct2] = useState("");
  const [currentReactionType, setCurrentReactionType] = useState("");
  const [currentHint, setCurrentHint] = useState("");

  var questionId = 1;
  var correctQues = 0;
  var wrongQues = 0;

  var api = "http://192.168.18.7/Chemiz/getQuestion.php";
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  var data = {
    questionNo: questionId,
  };
  fetch(api, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setCurrentQuestionNo(response.question_id);
      setCurrentDifficulty(response.difficulty);
      setCurrentPrompt(response.prompt);
      setCurrentStartingMaterial(response.starting_material);
      setCurrentNucleophile(response.nucleophile);
      setCurrentSolvent(response.solvent);
      setCurrentProduct(response.product);
      setCurrentProduct2(response.product2);
      setCurrentReactionType(response.reaction_type);
      setCurrentHint(response.hint);
    })
    .catch((error) => {
      console.error(error);
    });
  return (
    <View style={styles.container}>
      <View style={styles.questionView}>
        <Text style={styles.difficultyText}>{currentDifficulty}</Text>
        <Text style={styles.questionText}>Question {currentQuestionNo}</Text>
        <Text style={styles.questionText}>{currentPrompt}</Text>
      </View>
      <View>
        <Image style={styles.card} source={All[`${currentStartingMaterial}`]} />
        <Image style={styles.card} source={All[`${currentNucleophile}`]} />
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
  questionView: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 300,
    borderRadius: 10,
    position: "absolute",
    top: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#F8DE7E",
  },
  difficultyText: {
    fontSize: 17,
  },
  card: {
    height: 180,
    width: 130,
  },
});
