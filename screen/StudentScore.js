import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function StudentScore({ navigation, route }) {
  // console.log(route);
  const currentClass = route.params.class;

  const [studentArray, setStudentArray] = useState([]);

  const [insertQuesModalVisible, setInsertQuesModalVisible] = useState(false);
  const [deleteQuesModalVisible, setDeleteQuesModalVisible] = useState(false);

  let [addQuesId, setAddQuesId] = useState("");
  let [addPrompt, setAddPrompt] = useState("");
  let [addDifficulty, setAddDifficulty] = useState("");
  let [addStartingMaterial, setAddStartingMaterial] = useState("");
  let [addNucleophile, setAddNucleophile] = useState("");
  let [addSolvent, setAddSolvent] = useState("");
  let [addCarbocation, setAddCarbocation] = useState("");
  let [addLeavingGroup, setAddLeavingGroup] = useState("");
  let [addProduct, setAddProduct] = useState("");
  let [addProduct2, setAddProduct2] = useState("");
  let [addProduct3, setAddProduct3] = useState("");
  let [addReactionType, setAddReactionType] = useState("");
  let [addHint, setAddHint] = useState("");
  let [addExtraPicture, setAddExtraPictures] = useState("");
  let [addOptionType, setAddOptionType] = useState("");
  let [addArrow, setAddArrow] = useState("");

  let [deleteQuesId, setDeleteQuesId] = useState("");

  useEffect(() => {
    var api = "http://192.168.18.7/Chemiz/getStudent.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      currentClass: currentClass,
    };
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        var array = [];
        for (let i = 0; i < response.length; i++) {
          array.push(response[i]);
        }
        setStudentArray(array);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let rowSeparator = () => {
    return (
      <View
        style={{
          borderColor: "transparent",
          borderWidth: 3,
        }}
      />
    );
  };

  let eachRow = (item) => {
    return (
      <View style={styles.eachRowBg}>
        <Text style={styles.text}>{item.username}</Text>
        <TouchableOpacity />
      </View>
    );
  };

  function viewAllQuestions() {
    navigation.navigate("ViewAllQuestions");
  }

  function insertQuestion() {
    setInsertQuesModalVisible(true);
  }

  function onPressAdd() {
    if (!addQuesId) {
      alert("Please enter question id");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO question(question_id, prompt, difficulty, starting_material, nucleophile, solvent, carbocation, leaving_group, product, product2, product3, reaction_type, hint, extra, optionType, arrow) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          addQuesId,
          addPrompt,
          addDifficulty,
          addStartingMaterial,
          addNucleophile,
          addSolvent,
          addCarbocation,
          addLeavingGroup,
          addProduct,
          addProduct2,
          addProduct3,
          addReactionType,
          addHint,
          addExtraPicture,
          addOptionType,
          addArrow,
        ],
        (tx, results) => {
          console.log(results);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Question added successfully",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setInsertQuesModalVisible(false);
                  },
                },
              ],
              { cancelable: false }
            );
          } else alert("Add failed");
        }
      );
    });
  }

  function deleteQuestion() {
    setDeleteQuesModalVisible(true);
  }

  function onPressDelete() {
    if (!deleteQuesId) {
      alert("Please enter question id");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM question where question_id=?",
        [deleteQuesId],
        (tx, results) => {
          console.log(results);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Success",
              "Question deleted successfully",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setDeleteQuesModalVisible(false);
                  },
                },
              ],
              { cancelable: false }
            );
          } else alert("Delete failed");
        }
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student scores</Text>
      <View style={styles.topbuttonsView}>
        <TouchableOpacity
          onPress={viewAllQuestions}
          style={styles.topRowButton}
        >
          <Text style={styles.vaqText}>View all questions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={insertQuestion} style={styles.topRowButton}>
          <Text style={styles.vaqText}>Insert question</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtonView}>
        <TouchableOpacity
          onPress={deleteQuestion}
          style={styles.bottomRowButton}
        >
          <Text style={styles.vaqText}>Delete question</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.classText}>{currentClass}</Text>

      <FlatList
        style={styles.flatlist}
        data={studentArray}
        ItemSeparatorComponent={rowSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => eachRow(item)}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={insertQuesModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setInsertQuesModalVisible(false);
              }}
            />
            <View>
              <Text style={styles.modalTitle}>Add question</Text>
              <TextInput
                placeholder="Question id"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                keyboardType={"number-pad"}
                onChangeText={(quesId) => setAddQuesId(quesId)}
              />
              <TextInput
                placeholder="Prompt"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(prompt) => setAddPrompt(prompt)}
              />
              <TextInput
                placeholder="Difficulty"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(difficulty) => setAddDifficulty(difficulty)}
              />
              <TextInput
                placeholder="Starting material"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(startingMaterial) =>
                  setAddStartingMaterial(startingMaterial)
                }
              />
              <TextInput
                placeholder="Nucleophile"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(nucleophile) => setAddNucleophile(nucleophile)}
              />
              <TextInput
                placeholder="Solvent"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(solvent) => setAddSolvent(solvent)}
              />
              <TextInput
                placeholder="Carbocation"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(carbocation) => setAddCarbocation(carbocation)}
              />
              <TextInput
                placeholder="Leaving group"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(leavingGroup) =>
                  setAddLeavingGroup(leavingGroup)
                }
              />
              <TextInput
                placeholder="Product"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(product) => setAddProduct(product)}
              />
              <TextInput
                placeholder="Product 2"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(product2) => setAddProduct2(product2)}
              />
              <TextInput
                placeholder="Product 3"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(product3) => setAddProduct3(product3)}
              />
              <TextInput
                placeholder="Reaction type"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(reactionType) =>
                  setAddReactionType(reactionType)
                }
              />
              <TextInput
                placeholder="Hint"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(hint) => setAddHint(hint)}
              />
              <TextInput
                placeholder="Extra picture"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(extraPic) => setAddExtraPictures(extraPic)}
              />
              <TextInput
                placeholder="Option type"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(optionType) => setAddOptionType(optionType)}
              />
              <TextInput
                placeholder="Arrow"
                placeholderTextColor="#FFFFFF"
                style={styles.textInput}
                onChangeText={(arrow) => setAddArrow(arrow)}
              />
              <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteQuesModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setDeleteQuesModalVisible(false);
              }}
            />
            <View>
              <Text style={styles.modalTitle}>Delete question</Text>
              <TextInput
                placeholder="Question id"
                placeholderTextColor="#FFFFFF"
                keyboardType={"number-pad"}
                style={styles.textInput}
                onChangeText={(quesId) => setDeleteQuesId(quesId)}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={onPressDelete}
              >
                <Text style={styles.addText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  classText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  eachRowBg: {
    backgroundColor: "#B894CF",
    borderRadius: 8,
    height: 35,
  },
  text: {
    fontSize: 18,
  },
  flatlist: {
    margin: 10,
  },
  topRowButton: {
    backgroundColor: "#FFFFFF",
    height: 30,
    width: 150,
    margin: 20,
    borderRadius: 10,
    justifyContent: "center",
  },
  bottomRowButton: {
    backgroundColor: "#FFFFFF",
    height: 30,
    width: 150,
    borderRadius: 10,
    justifyContent: "center",
  },
  vaqText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
    margin: 10,
    backgroundColor: "#9E7BB5",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  topbuttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomButtonView: {
    alignItems: "center",
  },
  textInput: {
    marginBottom: 8,
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    width: 130,
  },
  closeIcon: {
    left: 65,
    top: -15,
  },
  modalTitle: {
    fontSize: 17,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 45,
  },
  addText: {
    textAlign: "center",
  },
});
