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
import { render } from "react-dom";
// import { StackNavigator } from "react-navigation";
// import { createStackNavigator } from "@react-navigation/stack";
// import Main from "./Main.js";
// import { NavigationContainer } from "@react-navigation/native";

export default function Home({ navigation }) {
    const [textInputUsername, setTextInputUsername] = useState('');
    const [textInputPassword, setTextInputPassword] = useState('');
    // const checkTextInput = () => {
    //   //Check for the Name TextInput
    //   if (!textInputUsername.trim() && !textInputPassword.trim()) {
    //     alert("Please enter username and password");
    //     return;
    //   } else if (!textInputUsername.trim()) {
    //     alert("Please enter username");
    //     return;
    //   } else if (!textInputPassword.trim()) {
    //     alert("Please enter your password");
    //     return;
    //   }
    //   //Checked Successfully
    //   //Do whatever you want
    //   navigation.navigate('Main');
    //   // <TouchableOpacity
    //   //   style={styles.button}
    //   //   onPress={() => navigation.navigate("Main")}
    //   // >
    //   //   <Text style={styles.btnText}>Start</Text>
    //   // </TouchableOpacity>;
    // };

    // Setting up Login Activity title.
    // static navigationOptions = {
    //   title: "Home",
    // };
    // constructor(props); {
    //   super(props);

    //   this.state = {
    //     Username: "",
    //     UserPassword: "",
    //   };
    // }

    UserLoginFunction = () => {
      fetch("http://localhost/fyp/userLogin.php", {
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
          // If server response message same as Data Matched
          if (responseJson === "Data Matched") {
            //Then open Profile activity and send user email to profile activity.
            navigation.navigate("Main", { Username: textInputUsername });
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    render(); {
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
 
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
     borderColor: '#2196F3',
     
     // Set border Radius.
     borderRadius: 5 ,
     
    },
     
     TextComponentStyle: {
       fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});
