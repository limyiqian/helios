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
import Home from "./screen/Home.js";
import Main from "./screen/Main.js";
import UserGuide from "./screen/UserGuide.js";
import UserGuide2 from "./screen/UserGuide2.js";
import UserGuide3 from "./screen/UserGuide3.js";
import Bases from "./screen/Bases.js";
import Solvents from "./screen/Solvents.js";
import DecisionApproach from "./screen/DecisionApproach.js";

const Stack = createStackNavigator();

// export default MainProject = StackNavigator(
//   {
//      First: { screen: Home },
     
//      Second: { screen: Main }
   
//   });

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Home" component={Home} options={{headerShown: true}} />
        <Stack.Screen name="Main" component={Main} options={{headerShown: true}} />
        <Stack.Screen name="UserGuide" component={UserGuide} options={{headerShown: true}} />
        <Stack.Screen name="UserGuide2" component={UserGuide2} options={{headerShown: true}} />
        <Stack.Screen name="UserGuide3" component={UserGuide3} options={{headerShown: true}} />
        <Stack.Screen name="Bases" component={Bases} options={{headerShown: true}} />
        <Stack.Screen name="Solvents" component={Solvents} options={{headerShown: true}} />
        <Stack.Screen name="DecisionApproach" component={DecisionApproach} options={{headerShown: true}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

