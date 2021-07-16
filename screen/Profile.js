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

export default function Profile({ navigation, route }) {
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const { user_id, username, userPassword } = route.params;

  const [newUser_id, setUserId] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const [wrongTotal, setWrongTotal] = useState(0);
  // const [correctTotal, setCorrectTotal] = useState(0);
  // const [score, setScore] = useState(0);

  useEffect(() => {
    var api = "http://10.174.122.249/Chemiz/getUser.php";
    var api = "http://192.168.1.71/Chemiz/getUser.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      username: username,
      password: userPassword,
    };
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUsername(response.username);
        setPassword(response.password);
        setEmail(response.email);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function updateUserDetail() {
    var api = "http://10.174.122.249/Chemiz/updateUserDetails.php";
    var api = "http://192.168.1.71/Chemiz/updateUserDetails.php";
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
        if (response.success == true) {
          Alert.alert("Updated successful");
        } else {
          Alert.alert("Update failed");
        }
      });
  }

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
      <Text style={styles.avgScore}>Average Score:</Text>

      <Text style={styles.text}>Latest Attempt</Text>
      <View style={styles.card}></View>

      <Text style={styles.text}>All Attempts</Text>
      <View style={styles.card}></View>

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
                <Text>{username}</Text>
              </TextInput>
              <TextInput style={styles.textInput}
              onChangeText={(password) => setPassword(password)}>
                <Text>{userPassword}</Text>

              </TextInput>
              <TextInput style={styles.textInput}
              onChangeText={(email) => setEmail(email)}>
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
});
