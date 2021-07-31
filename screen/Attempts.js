import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

export default function Attempts(props) {
  const { user_id } = route.params;
  const [avgScore, setAvgScore] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    var api = "http://192.168.18.7/Chemiz/getAttempts.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      attempt: props.attempt_id,
    };
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setAvgScore(response.score / attempt_id);
        setCorrectTotal(response.correct);
        setWrongTotal(response.wrong);
        setScore(response.score);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      <Text>Average Score: {avgScore}</Text>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
