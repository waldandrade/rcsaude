import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
export default class LoginPage extends Component {
  render() {
    return (
      <View style={styles.rect1}>
        <Text style={styles.text1}>RC Saúde</Text>
        <Image style={styles.image1} source={require("../../assets/login_icon.png")}/>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text2}>ENTRAR</Text>
        </TouchableOpacity>
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
  },
  button1: {
    alignItems: 'center',
    padding: 10,
    width: 177.91,
    height: 40,
    backgroundColor: "rgba(21,161,90,1)",
    opacity: 1,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 18
  },
  text1: {
    fontSize: 20,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontWeight: 'bold'
  },
  text2: {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontWeight: 'bold'
  },
  image1: {
    width: 182,
    height: 182
  }
});
