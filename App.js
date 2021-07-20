import React, { useEffect, useState } from "react";
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
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");
import AllQuestions from "./screen/AllQuestions.js";

const Stack = createStackNavigator();

export default function App() {
  var all = AllQuestions.questions;
  // console.log("json" + JSON.stringify(all.questions));

  const [questionId, setQuestionId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [prompt, setPrompt] = useState("");
  const [startingMaterial, setStartingMaterial] = useState("");
  const [nucleophile, setNucleophile] = useState("");
  const [solvent, setSolvent] = useState("");
  const [carbocation, setCarbocation] = useState("");
  const [leavingGroup, setLeavingGroup] = useState("");
  const [product, setProduct] = useState("");
  const [product2, setProduct2] = useState("");
  const [product3, setProduct3] = useState("");
  const [reactionType, setReactionType] = useState("");
  const [hint, setHint] = useState("");
  const [extra, setExtra] = useState("");
  const [optionType, setOptionType] = useState("");
  const [arrow, setArrow] = useState("");

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function (tx, res) {
          console.log("User table:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS user(user_id  INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), role VARCHAR(255), class VARCHAR(255))",
              []
            );
          }
        }
      );
    });
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='question'",
        [],
        function (tx, res) {
          console.log("Question table:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS question", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS question(question_id INTEGER PRIMARY KEY AUTOINCREMENT, prompt VARCHAR(255), difficulty VARCHAR(255), starting_material VARCHAR(255), nucleophile VARCHAR(255), solvent VARCHAR(255), carbocation VARCHAR(255), leaving_group VARCHAR(255), product VARCHAR(255), product2 VARCHAR(255), product3 VARCHAR(255), reaction_type VARCHAR(255), hint VARCHAR(255), extra VARCHAR(255), optionType VARCHAR(255), arrow VARCHAR(255))",
              []
            );
          }
        }
      );

      addQuestions();
    });
  }, []);

  function addQuestions() {
    for (let i = 0; i < all.length; i++) {
      console.log("Question" + all[i].question_id);
      setQuestionId(all[i].question_id);
      setPrompt(all[i].prompt);
      setDifficulty(all[i].difficulty);
      setStartingMaterial(all[i].starting_material);
      setNucleophile(all[i].nucleophile);
      setSolvent(all[i].solvent);
      setCarbocation(all[i].carbocation);
      setLeavingGroup(all[i].leaving_group);
      setProduct(all[i].product);
      setProduct2(all[i].product2);
      setProduct3(all[i].product3);
      setReactionType(all[i].reaction_type);
      setHint(all[i].hint);
      setExtra(all[i].extra);
      setOptionType(all[i].optionType);
      setArrow(all[i].arrow);

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO question (question_id, prompt, difficulty, starting_material, nucleophile, solvent, carbocation, leaving_group, product, product2, product3, reaction_type, hint, extra, optionType, arrow) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            questionId,
            prompt,
            difficulty,
            startingMaterial,
            nucleophile,
            solvent,
            carbocation,
            leavingGroup,
            product,
            product2,
            product3,
            reactionType,
            hint,
            extra,
            optionType,
            arrow,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log("Add successful");
            } else console.log("Add failed");
          }
        );
      });
    }
  }

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
