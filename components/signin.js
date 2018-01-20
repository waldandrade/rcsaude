import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ListView, Image, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';

export default class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(34);
    this.keyboardWillShowSub = null;
    this.keyboardWillHideSub = null;
  }

  state = {
    email: '',
    password: '',
    authenticating: false,
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 24,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: 34,
    }).start();
  };

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  onPressSignIn() {
    this.setState({
      authenticating: true
    })
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <KeyboardAvoidingView
        style={styles.form}
        behavior="padding"
      >
        <Animated.Image  style={[styles.image1, { height: this.imageHeight }]} source={require("./assets/marca_icon.png")}/>
        <Input
          placeholder='Digite seu email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          labelColor={"#f1f1f1"}
          color={"#00e3aa"}
          placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
          keyboardType={'email-address'}
          returnKeyType={'next'}
        />
        <Input
          placeholder='Digite sua senha...'
          label='Senha'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          labelColor={"#f1f1f1"}
          color={"#00e3aa"}
          placeholderTextColor={"rgba(244, 249, 247, 0.2)"}
          returnKeyType={'done'}
          onSubmitEditing={() => this.onPressSignIn()}
        />
        <Button onPress={() => this.onPressSignIn()} bgColor={{backgroundColor:"#00e3aa"}}>Log In</Button>
      </KeyboardAvoidingView>
    )
  }

  render() {
    return (
      <View style={styles.root}>
        {this.renderCurrentState()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(0,45,75,1)",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: 'center',
  },
  form: {
    flex: 1
  },
  image1: {
    maxWidth: 180,
    alignSelf: "center",
    marginBottom: 40,
  }
});
