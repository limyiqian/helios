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
import SQLite from 'react-native-sqlite-storage';
import { openDatabase } from "expo-sqlite";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUsername } from '../redux/actions';
// import { createStackNavigator } from "@react-navigation/stack";
// import Main from "./Main.js";
// import { NavigationContainer } from "@react-navigation/native";

const db = SQLite.openDatabase(
  {
      name: 'MainDB',
      location: 'default',
  },
  () => { },
  error => { console.log(error) }
);


export default function Home({ navigation }) {

  const { username, setUsername } = useState('');
    // const dispatch = useDispatch();

    useEffect(() => {
        createTable();
        getUsername();
    }, []);

    const createTable = () => {
      db.transaction((tx) => {
          tx.executeSql(
              "CREATE TABLE IF NOT EXISTS "
              + "Users "
              + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, score INTEGER);"
          )
      })
  }

  const getUsername = () => {
      try {
          db.transaction((tx) => {
              tx.executeSql(
                  "SELECT Name FROM Users",
                  [],
                  (tx, results) => {
                      var len = results.rows.length;
                      if (len > 0) {
                          navigation.navigate('Main');
                      }
                  }
              )
          })
      } catch (error) {
          console.log(error);
      }
  }

  const setUsernameData = async () => {
      if (username.length == 0) {
          Alert.alert('Warning!', 'Please enter your username.')
      } else {
          try {
              // dispatch(setUsername(username));
              // var user = {
              //     Name: name,
              //     Age: age
              // }
              // await AsyncStorage.setItem('UserData', JSON.stringify(user));
              await db.transaction(async (tx) => {
                  await tx.executeSql(
                      "INSERT INTO Users (username, score) VALUES ('" + username + "'," + 0 + ")"
                  );
                  // await tx.executeSql(
                  //     "INSERT INTO Users (username) VALUES (?)",
                  //     [username]
                  // );
              })
              navigation.navigate('Main');
          } catch (error) {
              console.log(error);
          }
      }
  }

  // const [textInputUsername, setTextInputUsername] = useState('');
  // const checkTextInput = () => {
  //   //Check for the Name TextInput
  //   if (!textInputUsername.trim()) {
  //     alert("Please Enter username");
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

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/chemiz.png")}
        style={styles.image}
      ></Image>
      <Text style={styles.appName}>Chemiz</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => setTextInputUsername(value)}
        style={styles.textInput}
      />

      <TouchableOpacity style={styles.button} onPress={checkTextInput}>
        <Text style={styles.btnText}>Start</Text>
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
