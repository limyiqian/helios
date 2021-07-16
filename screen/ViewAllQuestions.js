import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("myDatabase.db");

export default function ViewAllQuestions({ navigation, route }) {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_questions", [], (tx, results) => {
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
        key={item.user_id}
        style={{ backgroundColor: "white", padding: 20 }}
      ></View>
    );
  };

  return (
    <View>
      <Text>Questions</Text>
    </View>
  );
}
