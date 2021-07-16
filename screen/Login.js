import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Login",
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={{ margin: 10, backgroundColor: "orange", padding: 10 }}
      >
        <Text style={{ color: "#ffffff" }}>Main</Text>
      </TouchableOpacity>
    ),
  });
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPassword: "",
      user_id: 0,
      isTeacher: false,
    };
  }
  UserLoginFunction = () => {
    const { username, userPassword, user_id } = this.state;

    if (username == "") {
      alert("Please enter username");
      this.setState({ username: "Please enter username" });
    } else if (userPassword == "") {
      this.setState({ password: "Please enter password" });
    } else {
      fetch("http://192.168.18.7/Chemiz/findUser.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          // console.log(JSON.stringify(response));
          if (response.success != false) {
            if (response.role == "teacher") {
              this.props.navigation.navigate("StudentScore", {
                username: username,
                user_id: response.user_id,
                role: response.role,
                class: response.class,
              });
            } else if (response.role == "student") {
              this.props.navigation.navigate("Main", {
                username: username,
                user_id: response.user_id,
              });
            }
          } else {
            Alert.alert(
              "You have input wrong password or username",
              "Please try again",
              [{ text: "Ok", style: "cancel" }]
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    Keyboard.dismiss();
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/chemiz.png")}
          style={styles.image}
        ></Image>
        <Text style={styles.appName}>Chemiz</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(userPassword) => this.setState({ userPassword })}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.UserLoginFunction}
        >
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={styles.clickText}>New User? Click </Text>
          <TouchableOpacity>
            <Text
              style={styles.hereButton}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              here
            </Text>
          </TouchableOpacity>
          <Text style={styles.clickText}> to Sign Up.</Text>
        </View>
      </View>
    );
  }
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
});

AppRegistry.registerComponent("Login", () => Login);
