import { StatusBar } from "expo-status-bar";
import React from "react";
// import './userLogin.php';
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
// import { StackNavigator } from "react-navigation";
// import { createStackNavigator } from "@react-navigation/stack";
// import Main from "./Main.js";
// import { NavigationContainer } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [textInputUsername, setTextInputUsername] = useState("");
  const [textInputPassword, setTextInputPassword] = useState("");

  UserLoginFunction = () => {
    fetch("http://192.168.1.69/fyp/findUser.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: textInputUsername,

        password: textInputPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === textInputUsername) {
        navigation.navigate("Main", {paramKey: textInputUsername});
        } else {
          Alert.alert("You have input wrong password or username", "Please try again", [
            { text: "Ok", style: "cancel" },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/chemiz.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.appName}>Chemiz</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(Username) => setTextInputUsername(Username)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(UserPassword) => setTextInputPassword(UserPassword)}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={UserLoginFunction}>
        <Text style={styles.btnText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "center",
    // flex: 1,
    // margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    color: "#000000",
    paddingLeft: 20,
    marginTop: 40,
    borderRadius: 30,
    width: 300,
    height: 50,
  },
  button: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    fontWeight: "bold",
    height: 30,
    width: 70,
    margin: 40,
    borderRadius: 20,
  },
  btnText: {
    padding: 5,
    textAlign: "center",
  },
  // Tutorial css
  TextInputStyleClass: {
    textAlign: "center",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: "#2196F3",

    // Set border Radius.
    borderRadius: 5,
  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },
});