import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function Score({ navigation, route }) {
  // var user_id = 1;
  // var currentQuestionNo = 20;

  // const { correctTotal, wrongTotal } = route.params;
  const { gamemode, user_id, currentQuestionNo } = route.params;
  // const { currentQuestionNo } = route.params;
  // const {user_id} = route.params;
  // const [user_id, setUser_id] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [score, setScore] = useState(0);
  // const [totalNumQns, setTotalNumQns] = useState(0);

  // var attempt_id = 3;
  // attempt_id = attempt_id + attempt_id;

  useEffect(() => {
    var api = "http://192.168.0.116/Chemiz/getScore.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
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
        setCorrectTotal(response.correct);
        setWrongTotal(response.wrong);
        setScore(response.score);
        // setTotalNumQns(response.totalNumQns);
      })
      .catch((error) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM attempt where user_id = ? ORDER BY attempt_id DESC",
            [user_id],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                console.log(results);
                let attempt_id = results.rows.item(0).attempt_id;
                setCorrectTotal(results.rows.item(0).correct);
                setWrongTotal(results.rows.item(0).wrong);
                setScore(results.rows.item(0).score);
              } else {
                Alert.alert("No score found");
              }
            }
          );
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          <Text style={styles.scoreTxt}>Score</Text>
          <Text style={styles.scorePtsTxt}>{score} pts</Text>
          {/* <Text style={styles.scorePtsTxt}>1300 pts</Text> */}
        </View>
      </View>
      <View style={styles.cardsView}>
        <View style={styles.topCardView}>
          <View style={styles.correctCardView}>
            <Text style={styles.correctNumTxt}>
              <FontAwesome
                name="circle"
                size={10}
                color="#97be7c"
              />{" "}
              {correctTotal}
            </Text>
            <Text style={styles.correctTxt}>Correct</Text>
          </View>
          <View style={styles.wrongCardView}>
            <Text style={styles.wrongNumTxt}>
              <FontAwesome
                name="circle"
                size={10}
                // color: "#00FF00",
                color="#ff675e"
              />{" "}
              {wrongTotal}
            </Text>
            <Text style={styles.wrongTxt}>Wrong</Text>
          </View>
        </View>
        <View style={styles.bottomCardView}>
          <View style={styles.gamemodeView}>
            <Text style={styles.gameModeTxt}>
            <FontAwesome
                name="circle"
                size={10}
                // color: "#00FF00",
                color="#80cee1"
              />{" "}
              Gamemode
            </Text>
            <Text style={styles.gameMode}>{gamemode}</Text>
            {/* <Text style={styles.gameMode}>gamemode</Text> */}
          </View>
          <View style={styles.qnsView}>
            <Text style={styles.qnsTxt}>
              <FontAwesome
                name="circle"
                size={10}
                // color: "#00FF00",
                color="#ffd0db"
              />{" "}
              Total Question
            </Text>
            <Text style={styles.qnsNum}>{currentQuestionNo}</Text>
          </View>
        </View>
      </View>
      {/* ///////////////////////////////////////// */}
      <View style={styles.btnView}>
        {/* button View */}
        <TouchableOpacity>
          <View style={styles.btnPlayAgainCircle}>
            <FontAwesome5
              name="redo"
              size={25}
              color="#000000"
              style={{ left: 12, top: 13 }}
              onPress={() => navigation.navigate("Main")}
            />
          </View>
          <Text style={styles.btnPlayTxt}>Play again</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btnReviewCircle}>
            <Ionicons
              name="document"
              size={25}
              color="#000000"
              style={{ left: 15, top: 13 }}
              onPress={() => navigation.navigate("ReviewAns")}
            />
          </View>
          <Text style={styles.btnReviewTxt}>Review Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btnHomeCircle}>
            <AntDesign
              name="logout"
              size={25}
              color="#000000"
              style={{ left: 13, top: 12 }}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <Text style={styles.btnTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View>
    // //   <Text>score</Text>
    // // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
  },
  // scoreView: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 200,
  //   shadowColor: "grey",
  //   color: "#F8DE7E",
  //   backgroundColor: "#FFFFFF",
  // },
  btnHomeCircle: {
    position: "relative",
    width: 50,
    height: 50,
    left: 10,
    borderRadius: 150 / 2,
    backgroundColor: "#FFFFFF",
  },
  btnReviewCircle: {
    position: "relative",
    width: 50,
    height: 50,
    left: 15,
    borderRadius: 150 / 2,
    backgroundColor: "#FFFFFF",
  },
  btnPlayAgainCircle: {
    position: "relative",
    width: 50,
    height: 50,
    right: 15,
    borderRadius: 150 / 2,
    backgroundColor: "#FFFFFF",
  },
  inner: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    backgroundColor: "#FFFFFF",
  },
  outter: {
    position: "absolute",
    paddingTop: 10,
    paddingLeft: 10,
    top: 80,
    left: 150,
    width: 120,
    height: 120,
    borderRadius: 160 / 2,
    backgroundColor: "#fbf0c5",
  },
  scoreTxt: {
    top: 25,
    left: 25,
    fontWeight: "bold",
    color: "#ffc16b",
    fontSize: 18,
  },
  scorePtsTxt: {
    top: 25,
    // left: 15,
    textAlign: 'center',
    fontWeight: "bold",
    color: "#ffc16b",
    fontSize: 18,
  },
  cardsView: {
    position: "absolute",
    borderRadius: 20,
    width: 300,
    height: 120,
    top: 240,
    // bottom: 80,
    backgroundColor: "#FFFFFF",
  },
  topCardView: {
    flexDirection: "row",
  },
  correctNumTxt: {
    color: "#97be7c",
    alignSelf: "center",
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    top: 10,
  },
  correctTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    left: 37,
    top: 5,
  },
  wrongTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    left: 117,
    top: 5,
  },
  wrongNumTxt: {
    color: "#ff675e",
    left: 104,
    fontSize: 18,
    fontWeight: "bold",
    top: 10,
  },
  bottomCardView: {
    flexDirection: "row",
  },
  gameModeTxt: {
    color: "#80cee1",
    fontWeight: "bold",
    fontSize: 18,
    left: 21,
    top: 20,
  },
  gameMode: {
    left: 40,
    top: 15,
  },
  qnsTxt: {
    color: "#ffd0db",
    fontWeight: "bold",
    fontSize: 18,
    left: 43,
    top: 20,
  },
  qnsNum: {
    left: 60,
    top: 15,
  },
  correctCardView: {
    flexDirection: "column",
  },
  wrongCardView: {
    flexDirection: "column",
  },
  gamemodeView: {
    flexDirection: "column",
  },
  qnsView: {
    flexDirection: "column",
  },
  btnView: {
    flexDirection: "row",
    top: 110,
  },
  btnPlayTxt: {
    right: 20,
  },
  btnReviewTxt: {
    left: 1,
  },
  btnTxt: {
    left: 15,
  },
});
