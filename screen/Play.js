import React, { useEffect, useState } from "react";
import Selection from "./Selection.js";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as All from "./Images.js";
import CountDown from "react-native-countdown-component";

export default function Play({ navigation, route }) {
  const { questionId, gamemode } = route.params;
  // const { user_id } = route.params;
  let user_id = 1;

  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionId);
  const [currentDifficulty, setCurrentDifficulty] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentStartingMaterial, setCurrentStartingMaterial] = useState("");
  const [currentNucleophile, setCurrentNucleophile] = useState("");
  const [currentSolvent, setCurrentSolvent] = useState("");
  const [currentCarbocation, setCurrentCarbocation] = useState("");
  const [currentLeavingGroup, setCurrentLeavingGroup] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentProduct2, setCurrentProduct2] = useState("");
  const [currentReactionType, setCurrentReactionType] = useState("");
  const [currentHint, setCurrentHint] = useState("");
  const [currentHintIcon, setCurrentHintIcon] = useState("help-circle-outline");
  const [currentExtra, setCurrentExtra] = useState("");
  const [currentOptionType, setCurrentOptionType] = useState("");

  const [correctTotal, setCorrectTotal] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);

  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const [selection, setSelection] = useState("");

  //Default timer is 60 seconds
  const [totalDuration, setTotalDuration] = useState(60);

  const [isNextQuestion, setIsNextQuestion] = useState(false);

  //Maximum number of questions (20 max)
  const [maxQues, setMaxQues] = useState(6);
  //Number of question correct to go next stage (how many correct + 1)
  const [answeredCorrect, setAnsweredCorrect] = useState(6);

  useEffect(() => {
    if (isNextQuestion) {
      var nextQues = parseInt(currentQuestionId) + 1;
      setCurrentQuestionId(nextQues);
      var isNextLevel = nextQues / answeredCorrect;
      console.log(isNextLevel);
      if (nextQues > maxQues) {
        insertAttempt();
      } else if (isNextLevel == 1) {
        setCurrentQuestionId(10);
      } else if (isNextLevel == 2) {
        setCurrentQuestionId(24);
      }
      setHintModalVisible(false);
      setOptionModalVisible(false);
      setCurrentQuestionNo(nextQues);
      setIsNextQuestion(false);
    }
  });

  function insertAttempt() {
    var totalScore = correctTotal * 100 - wrongTotal * 100;
    var api = "http://10.174.115.137/Chemiz/insertAttempt.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      correct: correctTotal,
      wrong: wrongTotal,
      score: totalScore,
      user_id: user_id,
    };
    console.log(JSON.stringify(data));
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.success == true) {
          navigation.navigate("Score", {
            user_id: user_id,
            gamemode: gamemode,
          });
          setOptionModalVisible(false);
        } else {
          console.log("Error in inserting attempt");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    //Go terminal type in ipconfig to find own ipv4 address (yq-192.168.18.7)
    var api = "http://10.174.115.137/Chemiz/getQuestion.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      questionNo: currentQuestionId,
    };
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        setCurrentQuestionId(response.question_id);
        setCurrentDifficulty(response.difficulty);
        setCurrentPrompt(response.prompt);
        setCurrentStartingMaterial(response.starting_material);
        setCurrentNucleophile(response.nucleophile);
        setCurrentSolvent(response.solvent);
        setCurrentCarbocation(response.carbocation);
        setCurrentLeavingGroup(response.leaving_group);
        setCurrentProduct(response.product);
        setCurrentProduct2(response.product2);
        setCurrentReactionType(response.reaction_type);
        setCurrentHint(response.hint);
        setCurrentExtra(response.extra);
        setCurrentOptionType(response.optionType);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentQuestionNo]);

  //Do something if time is over
  function timerOnFinish() {
    // console.log("Timer on finish");
    alert("Times up!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.questionView}>
        <View style={styles.correctWrongView}>
          <Text style={styles.correct}>{correctTotal}</Text>
          <Text style={styles.wrong}>{wrongTotal}</Text>
        </View>
        <CountDown
          until={totalDuration}
          timeToShow={["S"]}
          style={styles.countdownView}
          digitTxtStyle={styles.countdownTime}
          digitStyle={styles.countdown}
          timeLabelStyle={styles.countdownTimeLabel}
          timeLabels={{ s: "Second" }}
          onFinish={timerOnFinish}
          size={18}
        />
        <View style={styles.iconView}>
          <View>
            <Text style={styles.difficultyText}>{currentDifficulty}</Text>
            <Text style={styles.questionText}>
              Question {currentQuestionNo}
            </Text>
          </View>
          <Ionicons
            name={currentHintIcon}
            size={30}
            color="#F8DE7E"
            onPress={() => {
              setHintModalVisible(true);
            }}
          />
        </View>
        <Text style={styles.questionText}>{currentPrompt}</Text>
      </View>
      <View style={styles.cardsView}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={async () => {
              await setSelection("startingMaterial");
              setOptionModalVisible(true);
            }}
          >
            <Image
              style={styles.card}
              source={All[`${currentStartingMaterial}`]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await setSelection("nucleophile");
              setOptionModalVisible(true);
            }}
          >
            <Image style={styles.card} source={All[`${currentNucleophile}`]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await setSelection("solvent");
              setOptionModalVisible(true);
            }}
          >
            <Image style={styles.card} source={All[`${currentSolvent}`]} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <Image source={require("../assets/arrow.png")} style={styles.arrow} />
          <TouchableOpacity
            onPress={async () => {
              await setSelection("product");
              setOptionModalVisible(true);
            }}
          >
            <Image style={styles.card} source={All[`${currentProduct}`]} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await setSelection("reactionType");
              setOptionModalVisible(true);
            }}
          >
            <Image style={styles.card} source={All[`${currentReactionType}`]} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={hintModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setHintModalVisible(false);
              }}
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.modalHintText}>{currentHint}</Text>
            </View>
            <View style={styles.revisionView}>
              <Text style={styles.revisionText}>Revision</Text>
              <View style={styles.revisionTable}>
                <View style={styles.border}>
                  <Text
                    style={styles.pad}
                    onPress={() => {
                      navigation.navigate("Bases");
                      setHintModalVisible(false);
                    }}
                  >
                    Nucleophiles/Bases
                  </Text>
                </View>

                <View style={styles.border}>
                  <Text
                    style={styles.pad}
                    onPress={() => {
                      navigation.navigate("Solvents");
                      setHintModalVisible(false);
                    }}
                  >
                    Solvents
                  </Text>
                </View>

                <Text
                  style={styles.pad}
                  onPress={() => {
                    navigation.navigate("DecisionApproach");
                    setHintModalVisible(false);
                  }}
                >
                  Decision-tree approach
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={optionModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setOptionModalVisible(false);
              }}
            />
            <Selection
              selected={selection}
              option={currentOptionType}
              questionId={currentQuestionId}
              setIsNextQuestion={setIsNextQuestion}
              correctTotal={correctTotal}
              setCorrectTotal={setCorrectTotal}
              wrongTotal={wrongTotal}
              setWrongTotal={setWrongTotal}
            />
          </View>
        </View>
      </Modal>
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
  correct: {
    color: "#9DC183",
    fontWeight: "bold",
    fontSize: 18,
  },
  wrong: {
    color: "#D32E2A",
    fontWeight: "bold",
    fontSize: 18,
  },
  correctWrongView: {
    flexDirection: "row",
    width: 270,
    justifyContent: "space-between",
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
    height: 130,
    width: 100,
    margin: 5,
  },
  arrow: {
    height: 70,
    width: 90,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardsView: {
    position: "absolute",
    bottom: 80,
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 90,
    borderRadius: 10,
    position: "absolute",
    right: 20,
    bottom: 40,
  },
  submitText: {
    fontWeight: "bold",
    color: "#9E7BB5",
    textAlign: "center",
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#9E7BB5",
    borderRadius: 25,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 17,
  },
  modalHintText: {
    fontWeight: "bold",
    color: "#F8DE7E",
  },
  revisionText: {
    fontWeight: "bold",
  },
  revisionTable: {
    backgroundColor: "#FFFFFF",
    width: 200,
    borderRadius: 10,
  },
  pad: {
    paddingTop: 4,
    paddingLeft: 8,
  },
  border: {
    borderBottomColor: "#9E7BB5",
    borderBottomWidth: 1,
  },
  countdown: {
    backgroundColor: "#FFFFFF",
    width: 55,
    height: 55,
    borderRadius: 40,
    position: "absolute",
    top: -50,
  },
  countdownTime: {
    color: "#F8DE7E",
  },
  countdownTimeLabel: {
    color: "#F8DE7E",
    fontWeight: "bold",
    fontSize: 18,
  },
});
