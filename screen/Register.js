import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  insertUser = () => {
    var api = "http://192.168.1.197/Chemiz/insertUser.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      username: username,
      email: email,
      password: confirmPassword,
      role: role,
    };
    console.log(JSON.stringify(data));
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success);
        if (response.success == true) {
          Alert.alert("Successfully registered", "", [
            { text: "Ok", onPress: () => navigation.navigate("Login") },
          ]);
        } else {
          Alert.alert("Fail to register", "Please try again", [
            { text: "Ok", style: "cancel" },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/chemiz.png")}
          style={styles.logo}
        ></Image>
        <Text style={styles.appName}>Welcome to Chemiz!</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(username) => setUsername(username)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email address"
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Confirm password"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          style={styles.textInput}
        />
        <Picker
          selectedValue={role}
          onValueChange={(role) => setRole(role)}
          style={styles.twoPickers}
          itemStyle={styles.twoPickers}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
        <TouchableOpacity style={styles.registerBtn} onPress={insertUser}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={styles.clickText}>Already Registered? Click </Text>
          <TouchableOpacity>
            <Text
              style={styles.hereButton}
              onPress={() => navigation.navigate("Login")}
            >
              here
            </Text>
          </TouchableOpacity>
          <Text style={styles.clickText}> to Login.</Text>
        </View>
        <Image
          source={require("../assets/scientist.png")}
          style={styles.scientist}
        ></Image>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 90,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 48,
    width: 220,
    borderRadius: 30,
    padding: 10,
    margin: 8,
  },
  registerBtn: {
    height: 35,
    width: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
  },
  registerText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  clickText: {
    color: "#0000FF",
  },
  hereButton: {
    color: "#FF0000",
  },
  textView: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  scientist: {
    width: 140,
    height: 140,
    right: 110,
  },
  twoPickers: {
    width: 200,
    height: 88,
  },
  twoPickerItems: {
    height: 88,
  },
});
