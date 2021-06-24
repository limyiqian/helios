import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Picker,
} from "react-native";
import React from "react";

export default function Intermediate({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Q1</Text>
      <Image
        source={require("../assets/intermediateQ1/start.png")}
        style={styles.image}
      ></Image>
      <Image
        source={require("../assets/intermediateQ1/nucleophile.png")}
        style={styles.image}
      ></Image>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSolventsModalVisible(true)}
      >
        {/* <View>
          <Image
            source={require("../assets/intermediateQ1/solventOption.png")}
            style={styles.image}
          ></Image>
        </View> */}
      </TouchableOpacity>

      <Image
        source={require("../assets/arrow.png")}
        style={styles.image}
      ></Image>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setProductModalVisible(true)}
      >
        {/* <View>
          <Image
            source={require("../assets/intermediateQ1/productOption.png")}
            style={styles.image}
          ></Image>
        </View> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setReactionTypeModalVisible(true)}
      >
        {/* <View>
          <Image
            source={require("../assets/intermediateQ1/reactionTypeOption.png")}
            style={styles.image}
          ></Image>
        </View> */}
      </TouchableOpacity>

      {/* Submit button codes */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={solventsModalVisible}
      >
        <View>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setSolventsModalVisible(false);
              }}
            />
            <View style={styles.spacing}>
              <Text style={styles.changeUsernameText}>
                Choose one correct answer
              </Text>
              <Image
                source={require("../assets/intermediateQ1/solvent1.png")}
                style={styles.image}
              ></Image>
              <Image
                source={require("../assets/intermediateQ1/solvent2.png")}
                style={styles.image}
              ></Image>
            </View>
            <TouchableOpacity>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={productsModalVisible}
      >
        <View>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setProductModalVisible(false);
              }}
            />
            <View style={styles.spacing}>
              <Text style={styles.changeUsernameText}>
                Choose one correct answer
              </Text>
              <Image
                source={require("../assets/intermediateQ1/productType1.png")}
                style={styles.image}
              ></Image>
              <Image
                source={require("../assets/intermediateQ1/productType2.png")}
                style={styles.image}
              ></Image>
              <Image
                source={require("../assets/intermediateQ1/productType3.png")}
                style={styles.image}
              ></Image>
              <Image
                source={require("../assets/intermediateQ1/productType4.png")}
                style={styles.image}
              ></Image>
            </View>
            <TouchableOpacity>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={reactionTypeModalVisible}
      >
        <View>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={28}
              style={styles.closeIcon}
              color="black"
              onPress={() => {
                setReactionTypeModalVisible(false);
              }}
            />
            <View style={styles.spacing}>
              <Text style={styles.changeUsernameText}>
                Choose one correct answer
              </Text>
              <Image
                source={require("../assets/intermediateQ1/reactionType1.png")}
                style={styles.image}
              ></Image>
              <Image
                source={require("../assets/intermediateQ1/reactionType2.png")}
                style={styles.image}
              ></Image>
            </View>
            <TouchableOpacity>
              <Text>Done</Text>
            </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "center",
    // flex: 1,
    // margin: 10,
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
});
