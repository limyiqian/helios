import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react/cjs/react.development";
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("question.db");

export default function Main({ navigation, route }) {
  // const { user_id, username,userPassword, email } = route.params;
  const [gamemodeModalVisible, setGamemodeModalVisible] = useState(false);
  const [difficultyModalVisible, setDifficultyModalVisible] = useState(false);
  const [dropdownGamemodeChosen, setDropdownGamemodeChosen] =
    useState("Normal");
  const [dropdownDifficultyChosen, setDifficultyDropdownChosen] =
    useState("Basic");
  const [startQuestionId, setStartQuestionId] = useState(1);

  //In question database (can be changed accordingly)
  let basicId = 1;
  let intermediateId = 10;
  let advancedId = 24;

  useEffect(() => {
    if (dropdownDifficultyChosen == "Basic") {
      setStartQuestionId(basicId);
    } else if (dropdownDifficultyChosen == "Intermediate") {
      setStartQuestionId(intermediateId);
    } else if (dropdownDifficultyChosen == "Advanced") {
      setStartQuestionId(advancedId);
    }
  });

  useEffect(() => {});
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/chemiz.png")}
        style={styles.image}
      ></Image>
      <View style={styles.card}>
        <Text style={styles.title}>{route.params.username}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Play", {
              // username: route.params.username,
              questionId: startQuestionId,
              gamemode: dropdownGamemodeChosen,
            })
          }
        >
          <View style={styles.iconView}>
            <FontAwesome5 name="play" size={15} color="#F8DE7E" />
            <Text style={styles.iconViewText}> Play</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UserGuide")}
        >
          <View style={styles.iconView}>
            <FontAwesome5 name="book-open" size={20} color="#F8DE7E" />
            <Text style={styles.iconViewText}>User Guide</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setDifficultyModalVisible(true)}
        >
          <View style={styles.iconView}>
            <Ionicons name="analytics-outline" size={20} color="#F8DE7E" />
            <Text style={styles.iconViewText}>Difficulty</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Profile", {
              // user_id: user_id,
              // username: route.params.username,
              // userPassword: userPassword,
            })
          }
        >
          <View style={styles.iconView}>
            <Ionicons name="person" size={20} color="#F8DE7E" />
            <Text style={styles.iconViewText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setGamemodeModalVisible(true)}
        >
          <View style={styles.iconView}>
            <FontAwesome5 name="forward" size={20} color="#F8DE7E" />
            <Text style={styles.iconViewText}>Game Mode</Text>
            <View style={styles.iconView}></View>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Revision</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Bases")}
        >
          <Text style={styles.revisionTextView}>Nucleophiles/Bases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Solvents")}
        >
          <Text style={styles.revisionTextView}>Solvents</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("DecisionApproach")}
        >
          <Text style={styles.revisionTextView}>Decision-tree approach</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={gamemodeModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name="close-outline"
                size={28}
                style={styles.closeIcon}
                color="black"
                onPress={() => {
                  setGamemodeModalVisible(false);
                }}
              />
              <View style={styles.spacing}>
                <Text style={styles.modalTitle}>Change Game Mode</Text>
                <Picker
                  selectedValue={dropdownGamemodeChosen}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue) =>
                    setDropdownGamemodeChosen(itemValue)
                  }
                >
                  <Picker.Item label="Normal" value="Normal" />
                  <Picker.Item label="Random" value="Random" />
                  <Picker.Item label="Team" value="Team" />
                  <Picker.Item label="Speed" value="Speed" />
                </Picker>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => {
                    setGamemodeModalVisible(false);
                    console.log(dropdownGamemodeChosen);
                  }}
                >
                  <Text style={styles.changeButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={difficultyModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Ionicons
                name="close-outline"
                size={28}
                style={styles.closeIcon}
                color="black"
                onPress={() => {
                  setDifficultyModalVisible(false);
                }}
              />
              <View style={styles.spacing}>
                <Text style={styles.modalTitle}>Change difficulty</Text>
                <Picker
                  selectedValue={dropdownDifficultyChosen}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  onValueChange={(itemValue) =>
                    setDifficultyDropdownChosen(itemValue)
                  }
                >
                  <Picker.Item label="Basic" value="Basic" />
                  <Picker.Item label="Intermediate" value="Intermediate" />
                  <Picker.Item label="Advanced" value="Advanced" />
                </Picker>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => {
                    setDifficultyModalVisible(false);
                    console.log(dropdownDifficultyChosen);
                  }}
                >
                  <Text style={styles.changeButtonText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8DE7E",
    flex: 1,
    // justifyContent: "space-between",
    // flexDirection: "row"
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#fafafa",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "100%",
    // marginBottom: 'auto',
    // flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    alignContent: "space-between",
    // marginBottom: 36,
  },
  title: {
    marginTop: 30,
    marginLeft: 30,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    paddingLeft: 35,
    borderRadius: 1,
  },
  iconView: {
    flexDirection: "row",
  },
  iconViewText: {
    marginLeft: 25,
  },
  revisionTextView: {
    marginLeft: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#9E7BB5",
    borderRadius: 25,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 16,
    right: 17,
  },
  changeButton: {
    borderRadius: 12,
    backgroundColor: "white",
    width: 70,
    height: 23,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  changeButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#9E7BB5",
  },
  spacing: {
    paddingBottom: 30,
  },
  modalTitle: {
    fontWeight: "bold",
  },
  selectButton: {
    borderRadius: 12,
    backgroundColor: "white",
    width: 70,
    height: 23,
    position: "absolute",
    bottom: 2,
    right: 10,
  },
  picker: {
    width: 200,
    height: 44,
  },
  pickerItem: {
    height: 44,
  },
  // user: {
  //   borderColor: '#000000',
  //   borderWidth: 2,
  //   margin: 30,
  // }
});
