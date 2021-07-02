import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
// // Importing Stack Navigator library to add multiple activities.
// import { StackNavigator } from "@react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./screen/Main.js";
import Register from "./screen/Register.js";
import Play from "./screen/Play.js";
import UserGuide from "./screen/UserGuide.js";
import UserGuide2 from "./screen/UserGuide2.js";
import UserGuide3 from "./screen/UserGuide3.js";
import Bases from "./screen/Bases.js";
import Solvents from "./screen/Solvents.js";
import DecisionApproach from "./screen/DecisionApproach.js";
import Login from "./screen/Login.js";
import Score from "./screen/score.js";
import Intermediate from "./screen/Intermediate.js";
import Profile from "./screen/Profile.js";
import Easy from "./screen/Easy.js";
import Easy2 from "./screen/Easy2.js";
import ReviewAns from "./screen/ReviewAns.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
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
        {/* <Stack.Screen
          name="Intermediate"
          component={Intermediate}
          options={{ headerShown: true }}
        /> */}
        <Stack.Screen
          name="Register"
          component={Register}
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
        {/* <Stack.Screen
          name="Easy"
          component={Easy}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Easy2"
          component={Easy2}
          options={{ headerShown: true }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
