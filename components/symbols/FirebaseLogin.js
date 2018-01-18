import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export default class FirebaseLogin extends Component {
  render() {
    return (
      <View style={styles.rect1}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rect1: {
    flex: 1,
    marginTop: 24,
    alignSelf: "stretch",
    backgroundColor: "rgba(0,45,75,1)",
    opacity: 1,
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center"
  }
});
