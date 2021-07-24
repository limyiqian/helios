import React, { useState, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("chemizdb.db");

export default function ViewAllAttempts({ navigation, route }) {
  let [scoreItems, setScoreItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM attempts", [], (tx, results) => {
        console.log(results);
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
          setScoreItems(temp);
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
        key={item.attempt_id}
        style={{ backgroundColor: "white", padding: 20 }}
      >
        <Text>Attempt ID: {item.attempt_id}</Text>
        <Text>User ID: {item.user_id}</Text>
        <Text>Score: {item.score}</Text>
        <Text>correct: {item.correct}</Text>
        <Text>Wrong: {item.wrong}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Attempts</Text>
      <FlatList
        data={scoreItems}
        ItemSeparatorComponent={listViewItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => listItemView(item)}
      />
    </View>
  );
}
