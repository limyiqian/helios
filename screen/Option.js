import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as All from "./Images.js";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

function Option(props) {
  // console.log(props);
  let images = [];
  const [outImages, setOutImages] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [selectedOption, setSelectionOption] = useState("");
  var api = "http://192.168.18.7/Chemiz/getQuestionChoices.php";
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  var data = {
    questionNo: props.questionId,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    return await fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        let dataImage = [];
        for (var i = 0; i < response.length; i++) {
          dataImage.push(response[i]);
        }
        for (let i = 0; i < dataImage.length; i++) {
          images.push(
            <View key={i}>
              <TouchableOpacity onPress={() => userSelectOption(dataImage[i])}>
                <Image
                  style={styles.card}
                  source={All[`${dataImage[i].choice}`]}
                />
              </TouchableOpacity>
            </View>
          );
        }
        setOutImages(images);
      })
      .catch((error) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM question_choices WHERE question_id=?",
            [props.questionId],
            (tx, results) => {
              var len = results.rows.length;
              let dataImage = [];
              for (var i = 0; i < len; i++) {
                var item = results.rows.item(i);
                dataImage.push(item);
              }
              for (let i = 0; i < dataImage.length; i++) {
                images.push(
                  <View key={i}>
                    <TouchableOpacity
                      onPress={() => userSelectOption(dataImage[i])}
                    >
                      <Image
                        style={styles.card}
                        source={All[`${dataImage[i].choice}`]}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }
              setOutImages(images);
            }
          );
        });
      });
  };

  function userSelectOption(optionObj) {
    setSelectionOption(optionObj);
    setSelectedName(optionObj.name);
    console.log(optionObj);
  }

  function checkAnswer() {
    if (selectedOption.is_correct_choice == "True") {
      Alert.alert(
        "Correct",
        "+100 points",
        [
          {
            text: "Next",
            onPress: () => {
              {
                nextQuestion("correct");
              }
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else if (selectedOption.is_correct_choice == "False") {
      Alert.alert(
        "Wrong",
        "-100 points",
        [
          {
            text: "Next",
            onPress: () => {
              nextQuestion("wrong");
            },
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }

  function nextQuestion(isCorrect) {
    if (isCorrect == "correct") {
      props.setCorrectTotal(props.correctTotal + 1);
    } else if (isCorrect == "wrong") {
      props.setWrongTotal(props.wrongTotal + 1);
    }
    props.setIsNextQuestion(true);
  }

  return (
    <View>
      {outImages}
      <Text>Selected option:</Text>
      <Text>{selectedName}</Text>
      <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Option;

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: 100,
    margin: 5,
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 90,
    borderRadius: 10,
  },
  submitText: {
    fontWeight: "bold",
    color: "#9E7BB5",
    textAlign: "center",
  },
});
