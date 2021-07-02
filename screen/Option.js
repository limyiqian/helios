import React, { useEffect } from "react";
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
import * as All from "./Images.js";

function Option(props) {
  let images = ["basicSM1", "basicSM1"];

  // useEffect(() => {
  //   var api = "http://192.168.18.7/Chemiz/getQuestionChoices.php";
  //   var headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   };
  //   var data = {
  //     questionNo: props.questionId,
  //   };

  //   fetch(api, {
  //     method: "POST",
  //     headers: headers,
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       // console.log(response);
  //       for (var i = 0; i < response.length; i++) {
  //         images[i] = response[i].choice;
  //       }
  //       console.log(images);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  for (let i = 0; i < images.length; i++) {
    images.push(
      <View key={i}>
        <TouchableOpacity>
          <Image style={styles.card} source={All[`${"images[i]"}`]} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <Text>option</Text>
    </View>
  );
}

export default Option;

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: 100,
    margin: 5,
  },
});
