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
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Profile({ navigation, route }) {
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const { user_id } = route.params;

  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [avgScore, setAvgScore] = useState(0);
  const [wrongTotal, setWrongTotal] = useState(0);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [scoreTotal, setScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [attempt_id, setAttemptId] = useState(0);

  var totalScore = 0;

  let allAttempts = [];

  useEffect(() => {
    var api = "http://192.168.0.116/Chemiz/getUser.php";
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
        if (response.success == true) {
          setUsername(response.username);
          setPassword(response.password);
          setEmail(response.email);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function updateUserDetail() {
    var api = "http://192.168.0.116/Chemiz/updateUserDetails.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      user_id: user_id,
      username: name,
      password: password,
      email: email,
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
      });
  }

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
        setAttemptId(response.attempt_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    var api = "http://192.168.0.116/Chemiz/getAttempts.php";
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
        let correct = [];
        let wrong = [];
        let score = [];
        for (var i = 0; i < response.length; i++) {
          correct.push(response[i].correct);
          wrong.push(response[i].wrong);
          score.push(response[i].score);
          totalScore += response[i].score;
        }
        setAvgScore(totalScore / attempt_id);

        for (let i = 0; i < correct.length; i++) {
          allAttempts.push(
            <View key={i} style={styles.card}>
              <View style={styles.outer}>
                <View style={styles.inner}>
                  <Text style={styles.scoreText}>
                    Score:{"\n"}
                    {score[i]}
                  </Text>
                </View>
              </View>
              <View style={styles.correctCardView}>
                <Text style={styles.correctNumTxt}>
                  <FontAwesome name="circle" size={10} color="#97be7c" />{" "}
                  {correct[i]}
                </Text>
                <Text style={styles.correctTxt}>Correct</Text>
              </View>
              <View style={styles.wrongCardView}>
                <Text style={styles.wrongNumTxt}>
                  <FontAwesome name="circle" size={10} color="#ff675e" />{" "}
                  {wrong[i]}
                </Text>
                <Text style={styles.wrongTxt}>Wrong</Text>
              </View>
            </View>
          );
        }
        setAttempts(allAttempts);
      })
      .catch((error) => {
        console.error(error);
        console.log("Error!");
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/chemiz.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.username}>{name}</Text>
      <TouchableOpacity
        onPress={() => setEditProfileVisible(true)}
        style={styles.editButton}
      >
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>
      <Text style={styles.avgScore}>Average Score: {avgScore}</Text>

      <Text style={styles.text}>Latest Attempt</Text>
      <View style={styles.card}>
        <View style={styles.outer}>
          <View style={styles.inner}>
            <Text style={styles.scoreText}>
              Score:{"\n"}
              {scoreTotal}
            </Text>
          </View>
        </View>
        <View style={styles.correctCardView}>
          <Text style={styles.correctNumTxt}>
            <FontAwesome name="circle" size={10} color="#97be7c" />{" "}
            {correctTotal}
          </Text>
          <Text style={styles.correctTxt}>Correct</Text>
        </View>

        <View style={styles.wrongCardView}>
          <Text style={styles.wrongNumTxt}>
            <FontAwesome name="circle" size={10} color="#ff675e" /> {wrongTotal}
          </Text>
          <Text style={styles.wrongTxt}>Wrong</Text>
        </View>
      </View>
      <Text style={styles.text}>All Attempts</Text>
      <ScrollView>{attempts}</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setEditProfileVisible(false);
              }}
            />
            <View style={styles.spacing}>
              <Text>Edit Profile</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => setUsername(name)}
              >
                <Text>{name}</Text>
              </TextInput>
              <TextInput
                style={styles.textInput}
                onChangeText={(password) => setPassword(password)}
              >
                <Text>{password}</Text>
              </TextInput>
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => setEmail(email)}
              >
                <Text>{email}</Text>
              </TextInput>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={updateUserDetail}
              >
                <Text style={styles.updateText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
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
  },
  spacing: {
    paddingBottom: 30,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 25,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: "#fafafa",
    width: 50,
    height: 20,
    borderRadius: 5,
    marginLeft: 100,
  },
  updateText: {
    textAlign: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 17,
  },
  editButton: {
    backgroundColor: "#FFFFFF",
    height: 20,
    width: 100,
    borderRadius: 10,
    alignSelf: "center",
    margin: 10,
  },
  editText: {
    textAlign: "center",
  },
  avgScore: {
    marginLeft: 20,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 20,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  reviewButton: {
    backgroundColor: "#9E7BB5",
    height: 20,
    width: 100,
    borderRadius: 10,
    alignSelf: "center",
  },
  inner: {
    width: 100,
    height: 100,
    borderRadius: 160 / 2,
    backgroundColor: "#FFFFFF",
  },
  outer: {
    position: "relative",
    paddingTop: 10,
    paddingLeft: 10,
    top: 15,
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 160 / 2,
    backgroundColor: "#fbf0c5",
  },
  correctCardView: {
    flexDirection: "column",
  },
  wrongCardView: {
    flexDirection: "column",
  },
  scoreText: {
    textAlign: "center",
    paddingTop: 25,
    color: "#ffc16b",
    fontSize: 20,
    fontWeight: "bold",
  },
  correctNumTxt: {
    color: "#97be7c",
    textAlign: "center",
    bottom: 90,
    fontSize: 18,
    fontWeight: "bold",
  },
  correctTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    bottom: 112,
    left: 50,
  },
  wrongNumTxt: {
    color: "#ff675e",
    textAlign: "center",
    bottom: 98,
    right: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  wrongTxt: {
    textAlignVertical: "center",
    textAlign: "center",
    bottom: 120,
    left: 48,
  },
});
