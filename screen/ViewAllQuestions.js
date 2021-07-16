import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function ViewAllQuestions({ navigation, route }) {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM question", [], (tx, results) => {
        console.log(results);
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: "100%",
          backgroundColor: "black",
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
