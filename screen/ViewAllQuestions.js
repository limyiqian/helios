import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function ViewAllQuestions({ navigation, route }) {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    var api = "http://192.168.18.7/Chemiz/getAllQuestions.php";
    var headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(api, {
      method: "POST",
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        var temp = [];
        for (let i = 0; i < response.length; i++) {
          temp.push(response[i]);
          setFlatListItems(temp);
        }
      })
      .catch((error) => {
        db.transaction((tx) => {
          tx.executeSql("SELECT * FROM question", [], (tx, results) => {
            console.log(results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: "100%",
          borderColor: "#000000",
          borderWidth: 1,
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        key={item.question_id}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        <Text>Question id: {item.question_id}</Text>
        <Text>Prompt: {item.prompt}</Text>
        <Text>Starting material: {item.starting_material}</Text>
        <Text>Nucleophile: {item.nucleophile}</Text>
        <Text>Solvent: {item.solvent}</Text>
        <Text>Carbocation: {item.carbocation}</Text>
        <Text>Leaving group: {item.leaving_group}</Text>
        <Text>Product: {item.product}</Text>
        <Text>Product2: {item.product2}</Text>
        <Text>Product3: {item.product3}</Text>
        <Text>Reaction type: {item.reaction_type}</Text>
        <Text>Hint: {item.hint}</Text>
        <Text>Extra: {item.extra}</Text>
        <Text>Option type: {item.option_type}</Text>
        <Text>Arrow: {item.arrow}</Text>
        <Text>Did You Know?: {item.didYouKnow}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Questions</Text>
      <FlatList
        data={flatListItems}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
    </View>
  );
}
