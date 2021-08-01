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
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function Play({ navigation, route }) {
  const { questionId, gamemode, hint, duration } = route.params;
  // const { user_id } = route.params;
  let user_id = 1;

  const [currentQuestionNo, setCurrentQuestionNo] = useState(1);
  const [currentQuestionId, setCurrentQuestionId] = useState(41);
  const [currentDifficulty, setCurrentDifficulty] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentStartingMaterial, setCurrentStartingMaterial] = useState("");
  const [currentNucleophile, setCurrentNucleophile] = useState("");
  const [currentSolvent, setCurrentSolvent] = useState("");
  const [currentCarbocation, setCurrentCarbocation] = useState("");
  const [currentLeavingGroup, setCurrentLeavingGroup] = useState("");
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentProduct2, setCurrentProduct2] = useState("");
  const [currentProduct3, setCurrentProduct3] = useState("");
  const [currentReactionType, setCurrentReactionType] = useState("");
  const [currentHint, setCurrentHint] = useState("");
  const [hintVisibility, setHintVisibility] = useState(hint);
  const [currentExtra, setCurrentExtra] = useState("");
  const [currentOptionType, setCurrentOptionType] = useState("");
  const [currentArrow, setCurrentArrow] = useState("");
  const [numOfOptionsToBeAnswered, setNumOfOptionsToBeAnswered] = useState(0);

  const [correctTotal, setCorrectTotal] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);

  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const [selection, setSelection] = useState("");
  const [imageName, setImageName] = useState("");

  const [totalDuration, setTotalDuration] = useState(duration);
  const [countDownId, setCountDownId] = useState("1");

  const [quesNoArray, setQuesNoArray] = useState([]);

  const [isNextQuestion, setIsNextQuestion] = useState(false);

  const [maxQues, setMaxQues] = useState(20);
  const [answerCorrectToNextLvl, setAnswerCorrectToNextLvl] = useState(5);

  useEffect(() => {
    if (isNextQuestion) {
      var randomId = Math.random().toString();
      setCountDownId(randomId);
      if (gamemode == "Random") {
        quesNoArray.push(currentQuestionNo);
        var nextQues = getRandomNumber(quesNoArray);
        setCurrentQuestionId(nextQues);
        console.log("Random:" + nextQues);
      } else {
        var nextQues = parseInt(currentQuestionId) + 1;
        setCurrentQuestionId(nextQues);
      }
      var nextLvl = correctTotal / answerCorrectToNextLvl;
      if (currentQuestionNo > maxQues) {
        insertAttempt();
      } else if (nextLvl == 1) {
        setCurrentQuestionId(19);
      } else if (nextLvl == 2) {
        setCurrentQuestionId(41);
      }
      setHintModalVisible(false);
      setOptionModalVisible(false);
      setCurrentQuestionNo(currentQuestionNo + 1);
      setIsNextQuestion(false);
    }
  });

  function getRandomNumber(array) {
    let randomNumber = Math.floor(Math.random() * 59) + 1;
    for (let i = 0; i < array.length; i++) {
      if (randomNumber == array[i]) {
        getRandomNumber(array);
      } else {
        return randomNumber;
      }
    }
  }

  function insertAttempt() {
    var totalScore = correctTotal * 100 - wrongTotal * 100;
    var api = "http://192.168.18.7/Chemiz/insertAttempt.php";
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
            currentQuestionNo: currentQuestionNo,
          });
          setOptionModalVisible(false);
        } else {
          console.log("Error in inserting attempt");
        }
      })
      .catch((error) => {
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO attempts (user_id, score, correct, wrong) VALUES (?,?,?,?)",
            [user_id, totalScore, correctTotal, wrongTotal],
            (tx, results) => {
              console.log("Rows affected:", results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log("Inserted Successfully");
                setOptionModalVisible(false);
              } else console.log("Insertion Failed");
            }
          );
        });
      });
  }

  useEffect(() => {
    //Go terminal type in ipconfig to find own ipv4 address
    var api = "http://192.168.18.7/Chemiz/getQuestion.php";
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
        setCurrentProduct3(response.product3);
        setCurrentReactionType(response.reaction_type);
        setCurrentHint(response.hint);
        setCurrentExtra(response.extra);
        setCurrentOptionType(response.optionType);
        setCurrentArrow(response.arrow);
        let optionArr = response.optionType.split(",");
        let numberOfOptions = optionArr.length;
        setNumOfOptionsToBeAnswered(numberOfOptions);
      })
      .catch((error) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM question where question_id=?",
            [currentQuestionId],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                // console.log(results);
                setCurrentQuestionId(results.rows.item(0).question_id);
                setCurrentDifficulty(results.rows.item(0).difficulty);
                setCurrentPrompt(results.rows.item(0).prompt);
                setCurrentStartingMaterial(
                  results.rows.item(0).starting_material
                );
                setCurrentNucleophile(results.rows.item(0).nucleophile);
                setCurrentSolvent(results.rows.item(0).solvent);
                setCurrentCarbocation(results.rows.item(0).carbocation);
                setCurrentLeavingGroup(results.rows.item(0).leaving_group);
                setCurrentProduct(results.rows.item(0).product);
                setCurrentProduct2(results.rows.item(0).product2);
                setCurrentProduct3(results.rows.item(0).product3);
                setCurrentReactionType(results.rows.item(0).reaction_type);
                setCurrentHint(results.rows.item(0).hint);
                setCurrentExtra(results.rows.item(0).extra);
                setCurrentOptionType(results.rows.item(0).optionType);
                setCurrentArrow(results.rows.item(0).arrow);
              } else {
                Alert.alert("No data found");
              }
            }
          );
        });
      });
  }, [currentQuestionNo]);

  function timerOnFinish() {
    setIsNextQuestion(true);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.questionView}>
          <View style={styles.correctWrongView}>
            <Text style={styles.correct}>{correctTotal}</Text>
            <Text style={styles.wrong}>{wrongTotal}</Text>
          </View>
          <CountDown
            id={countDownId}
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
            <View>
              {hintVisibility ? (
                <Ionicons
                  name="help-circle-outline"
                  size={30}
                  color="#F8DE7E"
                  onPress={() => {
                    setHintModalVisible(true);
                  }}
                />
              ) : null}
            </View>
          </View>
          <Text style={styles.questionText}>{currentPrompt}</Text>
        </View>

        <View style={styles.cardsView}>
          <View style={styles.topRow}>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("startingMaterial");
                setImageName(currentStartingMaterial);
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
                setImageName(currentNucleophile);
                setOptionModalVisible(true);
              }}
            >
              <Image
                style={styles.card}
                source={All[`${currentNucleophile}`]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("solvent");
                setImageName(currentSolvent);
                setOptionModalVisible(true);
              }}
            >
              <Image style={styles.card} source={All[`${currentSolvent}`]} />
            </TouchableOpacity>
          </View>
          <View style={styles.secondRow}>
            <Image source={All[`${currentArrow}`]} style={styles.arrow} />
            <TouchableOpacity
              onPress={async () => {
                await setSelection("product");
                setImageName(currentProduct);
                setOptionModalVisible(true);
              }}
            >
              <Image style={styles.card} source={All[`${currentProduct}`]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("reactionType");
                setImageName(currentReactionType);
                setOptionModalVisible(true);
              }}
            >
              <Image
                style={styles.card}
                source={All[`${currentReactionType}`]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("carbocation");
                setImageName(currentCarbocation);
                setOptionModalVisible(true);
              }}
            >
              <Image
                style={styles.card}
                source={All[`${currentCarbocation}`]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("product2");
                setImageName(currentProduct2);
                setOptionModalVisible(true);
              }}
            >
              <Image style={styles.card} source={All[`${currentProduct2}`]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("product3");
                setImageName(currentProduct3);
                setOptionModalVisible(true);
              }}
            >
              <Image style={styles.card} source={All[`${currentProduct3}`]} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("leavingGroup");
                setImageName(currentLeavingGroup);
                setOptionModalVisible(true);
              }}
            >
              <Image
                style={styles.card}
                source={All[`${currentLeavingGroup}`]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await setSelection("extra");
                setImageName(currentExtra);
                setOptionModalVisible(true);
              }}
            >
              <Image style={styles.card} source={All[`${currentExtra}`]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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
              imageName={imageName}
              optionType={currentOptionType}
              questionId={currentQuestionId}
              setIsNextQuestion={setIsNextQuestion}
              correctTotal={correctTotal}
              setCorrectTotal={setCorrectTotal}
              wrongTotal={wrongTotal}
              setWrongTotal={setWrongTotal}
              setOptionModalVisible={setOptionModalVisible}
              numOfOptionsToBeAnswered={numOfOptionsToBeAnswered}
              setNumOfOptionsToBeAnswered={setNumOfOptionsToBeAnswered}
              setCountDownId={setCountDownId}
              currentQuestionNo={currentQuestionNo}
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
  scrollview: {
    marginTop: 10,
  },
  questionView: {
    backgroundColor: "#FFFFFF",
    height: 150,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
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
    height: 135,
    width: 105,
    margin: 5,
  },
  arrow: {
    height: 65,
    width: 90,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardsView: {
    marginTop: 20,
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
