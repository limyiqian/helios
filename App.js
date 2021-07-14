import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screen/Main.js";
import Register from "./screen/Register.js";
import StudentScore from "./screen/StudentScore.js";
import ViewAllQuestions from "./screen/ViewAllQuestions.js";
import Play from "./screen/Play.js";
import UserGuide from "./screen/UserGuide.js";
import UserGuide2 from "./screen/UserGuide2.js";
import UserGuide3 from "./screen/UserGuide3.js";
import Bases from "./screen/Bases.js";
import Solvents from "./screen/Solvents.js";
import DecisionApproach from "./screen/DecisionApproach.js";
import Login from "./screen/Login.js";
import Score from "./screen/Score.js";
import Profile from "./screen/Profile.js";
import ReviewAns from "./screen/ReviewAns.js";

const Stack = createStackNavigator();

import * as SQLite from "expo-sqlite";
var db = SQLite.openDatabase("myDatabase.db");

export default function App() {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_questions'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_questions", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_questions(question_id INTEGER PRIMARY KEY AUTOINCREMENT, prompt VARCHAR(255), difficulty VARCHAR(255), starting_material VARCHAR(255), nucleophile VARCHAR(255), solvent VARCHAR(255), carbocation VARCHAR(255), leaving_group VARCHAR(255), product VARCHAR(255), product2 VARCHAR(255), reaction_type VARCHAR(255), hint VARCHAR(255), extra VARCHAR(255), optionType VARCHAR(255))",
              []
            );
          }
        }
      );
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="StudentScore"
          component={StudentScore}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ViewAllQuestions"
          component={ViewAllQuestions}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Play"
          component={Play}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ReviewAns"
          component={ReviewAns}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="UserGuide"
          component={UserGuide}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="UserGuide2"
          component={UserGuide2}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="UserGuide3"
          component={UserGuide3}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Bases"
          component={Bases}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Solvents"
          component={Solvents}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DecisionApproach"
          component={DecisionApproach}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
