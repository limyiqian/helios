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
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Score({ navigation, route }) {
  // const { correctTotal, wrongTotal } = route.params;
  // const { gamemode, user_id } = route.params;
  const {user_id} = route.params;
  // const [user_id, setUser_id] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [score, setScore] = useState(0);
  // const [totalNumQns, setTotalNumQns] = useState(0);

  // var attempt_id = 3;
  // attempt_id = attempt_id + attempt_id;

  useEffect(() => {
    var api = "http://192.168.1.69/Chemiz/getScore.php";
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
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          <Text style={styles.scoreTxt}>Score</Text>
          <Text style={styles.scoreTxt}>{score} pts</Text>
        </View>
      </View>
      <View style={styles.cardsView}>
        <View style={styles.topCardView}>
          <View style={styles.correctCardView}>
            <Text style={styles.correctNumTxt}>
              <FontAwesome
                name="circle"
                size={10}
                // color: "#00FF00",
                color="#00FF00"
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
                color="#FFA500"
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
                color="#87CEEB"
              />{" "}
              Gamemode
            </Text>
            <Text style={styles.gameMode}>gamemode</Text>
          </View>
          <View style={styles.qnsView}>
            <Text style={styles.qnsTxt}>
              <FontAwesome
                name="circle"
                size={10}
                // color: "#00FF00",
                color="#F4C2C2"
              />{" "}
              Total Question
            </Text>
            <Text style={styles.qnsNum}>20</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        {/* button View */}
        <TouchableOpacity>
          <View style={styles.btnPlayAgainCircle}>
            <FontAwesome5
              name="redo"
              size={25}
              color="#000000"
              style={{ left: 12, top: 13 }}
              onPress={() => navigation.navigate("Play")}
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
            <Ionicons
              name="home-outline"
              size={25}
              color="#000000"
              style={{ left: 13, top: 12 }}
              onPress={() => navigation.navigate("Main")}
            />
          </View>
          <Text style={styles.btnTxt}>Home</Text>
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
    right: 8,
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
  cardsView: {
    position: "absolute",
    borderRadius: 20,
    width: 300,
    height: 120,
    top: 280,
    // bottom: 80,
    backgroundColor: "#FFFFFF",
  },
  topCardView: {
    flexDirection: "row",
  },
  correctNumTxt: {
    color: "#00FF00",
    alignSelf: "center",
    left: 15,
    fontSize: 18,
    fontWeight: "bold",
    top: 10,
  },
  correctTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    left: 40,
    top: 5,
  },
  wrongTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    left: 117,
    top: 5,
  },
  wrongNumTxt: {
    color: "#FFA500",
    left: 104,
    fontSize: 18,
    fontWeight: "bold",
    top: 10,
  },
  bottomCardView: {
    flexDirection: "row",
  },
  gameModeTxt: {
    color: "#87CEEB",
    fontWeight: "bold",
    fontSize: 18,
    left: 25,
    top: 20,
  },
  gameMode: {
    left: 40,
    top: 15,
  },
  qnsTxt: {
    color: "#F4C2C2",
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
    top: 100,
  },
  btnPlayTxt: {
    right: 10,
  },
  btnReviewTxt: {
    left: 1,
  },
  btnTxt: {
    left: 15,
  },
});
