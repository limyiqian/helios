import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screen/Main.js";
import Register from "./screen/Register.js";
import Students from "./screen/Students.js";
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
import AllQnsChoices from "./screen/AllQnsChoices.js";
import ViewAllAttempts from "./screen/ViewAllAttempts.js";

const Stack = createStackNavigator();

export default function App() {
  var all = AllQuestions.questions;
  var allChoices = AllQnsChoices.questions;

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
        [],
        function (tx, res) {
          // console.log("User table:", res.rows.length);
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
          // console.log("Question table:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS question", [], async () => {
              txn.executeSql(
                "CREATE TABLE IF NOT EXISTS question(question_id INTEGER PRIMARY KEY AUTOINCREMENT, prompt VARCHAR(255), difficulty VARCHAR(255), starting_material VARCHAR(255), nucleophile VARCHAR(255), solvent VARCHAR(255), carbocation VARCHAR(255), leaving_group VARCHAR(255), product VARCHAR(255), product2 VARCHAR(255), product3 VARCHAR(255), reaction_type VARCHAR(255), hint VARCHAR(255), extra VARCHAR(255), optionType VARCHAR(255), arrow VARCHAR(255))",
                [],
                async () => {
                  var questionId = "";
                  var prompt = "";
                  var difficulty = "";
                  var startingMaterial = "";
                  var nucleophile = "";
                  var solvent = "";
                  var carbocation = "";
                  var leavingGroup = "";
                  var product = "";
                  var product2 = "";
                  var product3 = "";
                  var reactionType = "";
                  var hint = "";
                  var extra = "";
                  var optionType = "";
                  var arrow = "";

                  for (let i = 0; i < all.length; i++) {
                    questionId = all[i].question_id;
                    prompt = all[i].prompt;
                    difficulty = all[i].difficulty;
                    startingMaterial = all[i].starting_material;
                    nucleophile = all[i].nucleophile;
                    solvent = all[i].solvent;
                    carbocation = all[i].carbocation;
                    leavingGroup = all[i].leaving_group;
                    product = all[i].product;
                    product2 = all[i].product2;
                    product3 = all[i].product3;
                    reactionType = all[i].reaction_type;
                    hint = all[i].hint;
                    extra = all[i].extra;
                    optionType = all[i].option_type;
                    arrow = all[i].arrow;

                    var sql =
                      "INSERT INTO question (question_id, prompt, difficulty, starting_material, nucleophile, solvent, carbocation, leaving_group, product, product2, product3, reaction_type, hint, extra, optionType, arrow) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    var params = [
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
                    ];

                    executeSql(sql, params);
                  }
                }
              );
            });
          }
        }
      );
    });

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='question_choices'",
        [],
        function (tx, res) {
          // console.log("Question choices table:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql(
              "DROP TABLE IF EXISTS question_choices",
              [],
              async () => {
                txn.executeSql(
                  "CREATE TABLE IF NOT EXISTS question_choices(choice_id INTEGER PRIMARY KEY AUTOINCREMENT, choice VARCHAR(255), is_correct_choice VARCHAR(255), name VARCHAR(255), question_id INT(255), choice_type VARCHAR(255))",
                  [],
                  async () => {
                    var choiceId = "";
                    var choice = "";
                    var isCorrectChoice = "";
                    var name = "";
                    var questionIdC = "";
                    var choiceType = "";

                    for (let i = 0; i < allChoices.length; i++) {
                      choiceId = allChoices[i].choice_id;
                      choice = allChoices[i].choice;
                      isCorrectChoice = allChoices[i].is_correct_choice;
                      name = allChoices[i].name;
                      questionIdC = allChoices[i].question_id;
                      choiceType = allChoices[i].choice_type;

                      var sql =
                        "INSERT INTO question_choices (choice_id, choice, is_correct_choice, name, question_id, choice_type ) VALUES (?,?,?,?,?,?)";
                      var params = [
                        choiceId,
                        choice,
                        isCorrectChoice,
                        name,
                        questionIdC,
                        choiceType,
                      ];

                      executeSql(sql, params);
                    }
                  }
                );
              }
            );
          }
        }
      );
    });

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='attempt'",
        [],
        function (tx, res) {
          // console.log("Attempt table:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS attempt", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS attempt(attempt_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INT(255), score VARCHAR(255), correct VARCHAR(255), wrong VARCHAR(255))",
              []
            );
          }
        }
      );
    });
  }, []);

  executeSql = async (sql, params = []) => {
    return new Promise((resolve, reject) =>
      db.transaction((tx) => {
        console.log("executeSql " + params[0]);
        tx.executeSql(sql, params, reject);
      })
    );
  };

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
          name="Students"
          component={Students}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ViewAllQuestions"
          component={ViewAllQuestions}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ViewAllAttempts"
          component={ViewAllAttempts}
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
