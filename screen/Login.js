import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
// import './userLogin.php';
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
import { useState } from "react";
// import { StackNavigator } from "react-navigation";
// import { createStackNavigator } from "@react-navigation/stack";
// import Main from "./Main.js";
// import { NavigationContainer } from "@react-navigation/native";

export default class Login extends Component {

  // const [textInputUsername, setTextInputUsername] = useState("");
  // const [textInputPassword, setTextInputPassword] = useState("");

  static navigationOptions= ({navigation}) =>({
    title: 'Login',	
    headerRight:	
    <TouchableOpacity
    onPress={() => navigation.navigate('Main')}
    style={{margin:10,backgroundColor:'orange',padding:10}}>
    <Text style={{color:'#ffffff'}}>Main</Text>
    </TouchableOpacity>
  
});  
constructor(props){
  super(props)
  this.state={
    username:'',
    userPassword:''
  }
}
  UserLoginFunction = () => {
    const {username,userPassword} = this.state;

		if(username==""){
			alert("Please enter username");
		  this.setState({username:'Please enter username'})
			
		}

		else if(userPassword==""){
		this.setState({password:'Please enter password'})
		}
		else{

    fetch("http://192.168.1.69/fyp/findUser.php", {
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
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson == "ok") {
          alert("Successfully Login");
        this.props.navigation.navigate("Main", {paramKey: username});
        } else {
          Alert.alert("You have input wrong password or username", "Please try again", [
            { text: "Ok", style: "cancel" },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

    Keyboard.dismiss();
  }
  render(){
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/chemiz.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.appName}>Chemiz</Text>
      <TextInput
        placeholder="Username"
        onChangeText={username => this.setState({username})}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={userPassword => this.setState({userPassword})}
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={this.UserLoginFunction}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
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

AppRegistry.registerComponent("Login", () => Login);