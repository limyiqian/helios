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
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

import { Formik } from "formik";
import * as yup from "yup";

export default function Register({ navigation }) {
  const [role, setRole] = useState("student");

  const registerValidation = yup.object().shape({
    usernameVal: yup
      .string()
      .required("Username is required.")
      .min(6, "Username must be at least 6 characters.")
      .max(30, "Username must be lesser than 30 characters."),
    passwordVal: yup
      .string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters.")
      .max(30, "Username must be lesser than 30 characters.")
      .matches(/\w*[a-z]\w*/, "Password must have a small letter.")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter.")
      .matches(/\d/, "Password must have a digit.")
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>/]/,
        "Password must have a special character."
      ),
    confirmPasswordVal: yup
      .string()
      .required("Confirm password is required.")
      .oneOf([yup.ref("passwordVal")], "Password does not match."),
    emailVal: yup.string().required("Email is required."),
    classVal: yup.string().required("Class is required."),
  });

  insertUser = (values) => {
    var api = "http://192.168.18.7/Chemiz/insertUser.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      username: values.usernameVal,
      email: values.emailVal,
      password: values.confirmPasswordVal,
      role: role,
      class: values.classVal,
    };
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
        db.transaction(function (tx) {
          tx.executeSql(
            "INSERT INTO user (username, email, password, role, class) VALUES (?,?,?,?,?)",
            [
              values.usernameVal,
              values.emailVal,
              values.confirmPasswordVal,
              role,
              values.classVal,
            ],
            (tx, results) => {
              console.log("Rows affected:", results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  "Success",
                  "You are registered successfully",
                  [
                    {
                      text: "Ok",
                      onPress: () => navigation.navigate("Login"),
                    },
                  ],
                  { cancelable: false }
                );
              } else Alert.alert("Registration Failed");
            }
          );
        });
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
        <Formik
          validationSchema={registerValidation}
          initialValues={{
            usernameVal: "",
            emailVal: "",
            passwordVal: "",
            confirmPasswordVal: "",
            classVal: "",
          }}
          onSubmit={(values) => {
            insertUser(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View>
                <TextInput
                  placeholder="Username"
                  onChangeText={handleChange("usernameVal")}
                  onBlur={handleBlur("usernameVal")}
                  style={styles.textInput}
                />
                {errors.usernameVal && touched.usernameVal && (
                  <Text style={styles.errorText}>{errors.usernameVal}</Text>
                )}
                <TextInput
                  placeholder="Email address"
                  onChangeText={handleChange("emailVal")}
                  onBlur={handleBlur("emailVal")}
                  style={styles.textInput}
                />
                {errors.emailVal && touched.emailVal && (
                  <Text style={styles.errorText}>{errors.emailVal}</Text>
                )}
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={handleChange("passwordVal")}
                  onBlur={handleBlur("passwordVal")}
                  style={styles.textInput}
                />
                {errors.passwordVal && touched.passwordVal && (
                  <Text style={styles.errorText}>{errors.passwordVal}</Text>
                )}
                <TextInput
                  secureTextEntry={true}
                  placeholder="Confirm password"
                  onChangeText={handleChange("confirmPasswordVal")}
                  onBlur={handleBlur("confirmPasswordVal")}
                  style={styles.textInput}
                />
                {errors.confirmPasswordVal && touched.confirmPasswordVal && (
                  <Text style={styles.errorText}>
                    {errors.confirmPasswordVal}
                  </Text>
                )}
                <Picker
                  selectedValue={role}
                  onValueChange={(role) => setRole(role)}
                  style={styles.twoPickers}
                  itemStyle={styles.twoPickers}
                >
                  <Picker.Item label="Student" value="student" />
                  <Picker.Item label="Teacher" value="teacher" />
                </Picker>
                <TextInput
                  placeholder="Class"
                  onChangeText={handleChange("classVal")}
                  onBlur={handleBlur("classVal")}
                  style={styles.textInput}
                />
                {errors.classVal && touched.classVal && (
                  <Text style={styles.errorText}>{errors.classVal}</Text>
                )}
                <TouchableOpacity
                  style={styles.registerBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
    width: 270,
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
    alignSelf: "center",
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
    width: 280,
    height: 88,
  },
  twoPickerItems: {
    height: 88,
  },
  errorText: {
    fontSize: 14.5,
    color: "red",
    paddingLeft: 6,
  },
});
