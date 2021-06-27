// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   StyleSheet,
//   Image,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Alert,
// } from "react-native";
// import { useState } from "react";

// export default function Easy2({ navigation }) {
//   const [hintModeVisible, setHintModalVisible] = useState(false);
//   const [reactionModeVisible, setReactionModalVisible] = useState(false);

//   const createCorrectButton = () =>
//     Alert.alert("Correct Answer", "Good Job", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       { text: "OK", onPress: () => navigation.navigate("Easy2") },
//     ]);

//   const createWrongButton = () =>
//     Alert.alert("Wrong Answer", "Try again next time", [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Cancel Pressed"),
//         style: "cancel",
//       },
//       { text: "OK", onPress: () => navigation.navigate("Easy2") },
//     ]);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.text}>Q2 Basic</Text>
//       <TouchableOpacity onPress={() => setHintModalVisible(true)}>
//         <Image
//           source={require("../assets/hint.png")}
//           style={styles.hint}
//         ></Image>
//       </TouchableOpacity>
//       <Modal animationType="slide" transparent={true} visible={hintModeVisible}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Ionicons
//               name="close-outline"
//               size={28}
//               style={styles.closeIcon}
//               color="black"
//               onPress={() => {
//                 setHintModalVisible(false);
//               }}
//             />
//             <View style={styles.spacing}>
//               <Text style={styles.modalText}>
//                 Starting material has less steric hinderance.
//               </Text>
//               <Text style={styles.title}>Revision</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Bases")}
//                 style={styles.revision}
//               >
//                 <Text> Nucleophiles/Bases</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate("Solvents")}
//                 style={styles.revision}
//               >
//                 <Text> Solvents</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={() => navigation.navigate("DecisionApproach")}
//                 style={styles.revision}
//               >
//                 <Text> Decision-tree Approach</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <View style={styles.question}>
//         <Image
//           source={require("../assets/EasyQn2/start.png")}
//           style={styles.image}
//         ></Image>
//         <Image
//           source={require("../assets/EasyQn2/strong.png")}
//           style={styles.image}
//         ></Image>
//         <Image
//           source={require("../assets/EasyQn2/solvent.png")}
//           style={styles.image}
//         ></Image>
//       </View>

//       <Image
//         source={require("../assets/arrow.png")}
//         style={styles.arrow}
//       ></Image>

//       <View style={styles.question}>
//         <Image
//           source={require("../assets/EasyQn2/start.png")}
//           style={styles.image}
//         ></Image>

//         <TouchableOpacity onPress={() => setReactionModalVisible(true)}>
//           <Image
//             source={require("../assets/EasyQn2/reaction.png")}
//             style={styles.image}
//           ></Image>
//         </TouchableOpacity>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={reactionModeVisible}
//         >
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Ionicons
//                 name="close-outline"
//                 size={28}
//                 style={styles.closeIcon}
//                 color="black"
//                 onPress={() => {
//                   setReactionModalVisible(false);
//                 }}
//               />
//               <View style={styles.spacing}>
//                 <TouchableOpacity onPress={createWrongButton}>
//                   <Image
//                     source={require("../assets/EasyQn1/reactionOne.png")}
//                     style={styles.image}
//                   ></Image>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={createCorrectButton}>
//                   <Image
//                     source={require("../assets/EasyQn1/reactionTwo.png")}
//                     style={styles.image}
//                   ></Image>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FFFFFF",
//   },
//   text: {
//     fontSize: 30,
//     fontWeight: "bold",
//     alignSelf: "center",
//   },
//   modalText: {
//     fontSize: 20,
//   },
//   question: {
//     margin: 10,
//     flexDirection: "row",
//     alignSelf: "center",
//   },
//   hint: {
//     height: 30,
//     width: 32,
//     marginLeft: 360,
//   },
//   image: {
//     height: 140,
//     width: 110,
//     margin: 10,
//   },
//   arrow: {
//     height: 100,
//     width: 140,
//     margin: 10,
//     alignSelf: "center",
//     transform: [{ rotate: "90deg" }],
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "#9E7BB5",
//     borderRadius: 25,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },
//   spacing: {
//     paddingBottom: 30,
//   },
//   closeIcon: {
//     position: "absolute",
//     top: 16,
//     right: 17,
//   },
//   revision: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
// });
