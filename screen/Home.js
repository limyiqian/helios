import { StatusBar } from "expo-status-bar";
import React from "react";
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
// import { createStackNavigator } from "@react-navigation/stack";
// import Main from "./Main.js";
// import { NavigationContainer } from "@react-navigation/native";

export default function Home({ navigation }) {

  const [textInputUsername, setTextInputUsername] = useState('');
  const [textInputPassword, setTextInputPassword] = useState('');
  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!textInputUsername.trim() && !textInputPassword.trim()) {
      alert("Please enter username and password");
      return;
    } else if (!textInputUsername.trim()) {
      alert("Please enter username");
      return;
    } else if (!textInputPassword.trim()) {
      alert("Please enter your password");
      return;
    }
    //Checked Successfully
    //Do whatever you want
    navigation.navigate('Main');
    // <TouchableOpacity
    //   style={styles.button}
    //   onPress={() => navigation.navigate("Main")}
    // >
    //   <Text style={styles.btnText}>Start</Text>
    // </TouchableOpacity>;
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
        onChangeText={(usernameValue) => setTextInputUsername(usernameValue)}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(pwdValue) => setTextInputPassword(pwdValue)}
        style={styles.textInput}
      />

      <TouchableOpacity style={styles.button} onPress={checkTextInput}>
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
});
