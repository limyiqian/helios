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

export default function ReviewAns() {
  // const [wrong, setWrong] = useState(0);

  function checkUserAttempt() {
    var api = "http://192.168.1.77/Chemiz/checkUserAttempted.php"
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    var data = {
      option_id: option_id,
    };
    console.log(JSON.stringify(data));
    fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.result == true) {
          console.log("Deleted!")
        } else {
          console.log("Error in inserting attempt");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  return (
    <View style={styles.firstContainer}> 
      <Text style={styles.reviewAns}>Review Answer</Text>
      <View style={styles.card}>
        <Text style={styles.qnsTitle}> Question 1</Text>
      </View> 

    </View>
    
  );
}

const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    paddingLeft: 15,
    paddingRight: 15,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8DE7E",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fafafa",
    //borderRadius: 40,
    height: "30%",
    justifyContent: "space-between",
  },

  reviewAns: {
    fontWeight: "bold",
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },

  qnsTitle: {
    fontWeight: "bold",
    fontSize: 17,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#9E7BB5",
  },
});
