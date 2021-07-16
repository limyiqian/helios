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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StudentScore({ navigation, route }) {
  console.log(route);
  const currentClass = route.params.class;

  const [studentArray, setStudentArray] = useState([]);

  const [insertQuesModalVisible, setInsertQuesModalVisible] = useState(false);

  useEffect(() => {
    var api = "http://10.174.115.137/Chemiz/getStudent.php";
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
        console.log(response);
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
    console.log("view all question");
    navigation.navigate("ViewAllQuestions");
  }

  function insertQuestion() {
    console.log("insert question");
    setInsertQuesModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student scores</Text>
      <View style={styles.buttonsView}>
        <TouchableOpacity
          onPress={viewAllQuestions}
          style={styles.viewAllQuesButton}
        >
          <Text style={styles.vaqText}>View all questions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={insertQuestion}
          style={styles.viewAllQuesButton}
        >
          <Text style={styles.vaqText}>Insert question</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.classText}>{currentClass}</Text>
      <ScrollView>
        <FlatList
          style={styles.flatlist}
          data={studentArray}
          ItemSeparatorComponent={rowSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => eachRow(item)}
        />
      </ScrollView>

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
  viewAllQuesButton: {
    backgroundColor: "#FFFFFF",
    height: 30,
    width: 150,
    margin: 20,
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
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
