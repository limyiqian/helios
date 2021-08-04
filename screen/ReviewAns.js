import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function ReviewAns({ route }) {

  const [reviewAnswerArray, setReviewAnswerArray] = useState([]);

  const [optionID, setOptionID] = useState("");
  const [questionID, setQuestionID] = useState("");
  const [questionNo, setQuestionNo] = useState("");
  const [userID, setUserID] = useState("");
  const [id, setID] = useState("");
  const [attemptId, setAttemptID] = useState("");
  // const { user_id } = route;

  const {user_id} = 1;
  const {attempt_id} = 52;

  useEffect(() => {
    var api = "http://192.168.10.144/Chemiz/reviewAns.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      userId: user_id,
      attemptId: attempt_id,
    };
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        var array = [];
        for (let i = 0; i < response.length; i++) {
          array.push(response[i]);
        }
        setReviewAnswerArray(array);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  

  const renderView = ({ item, index }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.qnsTitle}> Question {setQuestionNo} </Text>
        <Text> {setOptionID} </Text>
        <Text> {setQuestionID} </Text>
        <Text> {setUserID} </Text>
        <Text> {setID} </Text>
        <Text> {setAttemptID} </Text>
      </View>
    );
  };

  return (
    <View style={styles.firstContainer}>
      <Text style={styles.reviewAns}>Review Answer</Text>
      <FlatList data={reviewAnswerArray} renderItem={renderView} />
    </View>
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    paddingLeft: 15,
    paddingRight: 15,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fafafa",
    //borderRadius: 40,
    height: "30%",
    justifyContent: "space-between",
  },

  reviewAns: {
    fontWeight: "bold",
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  qnsTitle: {
    fontWeight: "bold",
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#9E7BB5",
  },
});
